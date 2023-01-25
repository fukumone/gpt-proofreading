import {Router, helpers} from "./deps.ts";

const fetchTranslation = async (text: string) => {
  if (!text.trim()) {
    return;
  }
  const prompt = `I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more scientific and academic. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My sentences are ${text}`;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 500,
    }),
  };
  const {choices} = await fetch(
    "https://api.openai.com/v1/completions",
    requestOptions
  ).then((response) => response.json());
  return choices[0].text.trim();
};

const getTranslation = async (context) => {
  try {
    const {text} = helpers.getQuery(context, {mergeParams: true});

    if (!text) {
      context.response.status = 400;
      context.response.body = {
        success: false,
        message: "No text provided",
      };
      return;
    }

    const result = await fetchTranslation(text);
    context.response.status = 200;
    context.response.body = {
      success: true,
      data: result,
    };
  } catch (err) {
    context.response.status = 500;
    context.response.body = {
      success: false,
      message: err.toString(),
    };
  }
};

const router = new Router();

router.use(async (context, next) => {
  context.response.headers.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
  );
  context.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  context.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

router.get("/api/translate", getTranslation);

export default router;
