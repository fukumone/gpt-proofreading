import {useState} from "react";
import type {NextPage} from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Textarea from "@mui/joy/Textarea";
import Fade from "@mui/material/Fade";
import Popper from "@mui/material/Popper";
import styles from "../styles/Home.module.scss";
import TextareaValidator from "../components/TextareaValidator";
import LoadingIndicator from "../components/LoadingIndicator";

const Home: NextPage = () => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const fetchChatGPT3 = async (text: string) => {
    if (text.trim() === "") return;
    try {
      setIsLoading(true);
      await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/translate?text=${text}`
      )
        .then((response) => response.json())
        .then((data) => {
          const result = data.data.trim();
          setResult(result);
          return result;
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await global.navigator.clipboard.writeText(result);
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingIndicator />}
      <Head>
        <title>GPT Proofreading</title>
        <meta
          name='description'
          content='This is website that uses OpenAI to correct and improve text.'
        />
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href='/'>GPT Proofreading</Link>
        </h1>
        <div className={styles.formContainer}>
          <TextareaValidator
            result={result}
            setResult={setResult}
            onClick={async (text: string) => await fetchChatGPT3(text)}
          />
          <Textarea
            value={result}
            minRows={10}
            sx={{
              minWidth: 500,
            }}
            endDecorator={
              <Box
                sx={{
                  display: "flex",
                  gap: "var(--Textarea-paddingBlock)",
                  pt: "var(--Textarea-paddingBlock)",
                  borderTop: "1px solid",
                  borderColor: "divider",
                  flex: "auto",
                }}
              >
                <div>
                  <Button
                    sx={{ml: "auto"}}
                    onClick={(e) => {
                      copyToClipboard();
                      handleClick(e);
                    }}
                  >
                    Copy
                  </Button>
                  <Popper id={id} open={open} anchorEl={anchorEl} transition>
                    {({TransitionProps}) => (
                      <Fade {...TransitionProps} timeout={10}>
                        <Box
                          sx={{border: 1, p: 1, bgcolor: "background.paper"}}
                        >
                          Copied
                        </Box>
                      </Fade>
                    )}
                  </Popper>
                </div>
              </Box>
            }
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://github.com/fukumone'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" fukumone"}
          <span className={styles.logo}>
            <Image
              src='/github-mark-white.svg'
              alt='github logo'
              width={18}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
