/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import aplyToast from "@/lib/aplyToaster";
import { AnimatePresence, motion } from "framer-motion";
import { Code } from "lucide-react";
import { useEffect, useState } from "react";
import { CopyBlock, tomorrowNight } from "react-code-blocks";
import {
  getRetrieverCode,
  RetrieverLanguages,
  RetrieverOption,
} from "../../code-templates/retriever-code-sample";
import {
  getTextSplitterCode,
  SplitOptionLanguages,
} from "../../code-templates/text-splitter-code-sample";
import {
  getVectorStoreCode,
  VectorStoreLanguages,
} from "../../code-templates/vector-store-code-sample";
import {
  useSelectedPlaygroundRetrieverStore,
  useSelectedSplitOptionStore,
  useSelectedVectorStore,
} from "../../lib/globals";
import {
  LanguageOption,
  SplitOption,
  VectorStoreOption,
} from "../../lib/types";

export function CodeModal({
  name,
  code,
  codeExample,
  setLanguage,
  setLanguageDemo,
  ...props
}: {
  name: string;
  code: string;
  codeExample: { language: string; languageDemo: string };
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setLanguageDemo: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { selectedSplitOption } = useSelectedSplitOptionStore();

  const { selectedVectorStore } = useSelectedVectorStore();

  const { selectedPlaygroundRetriever } = useSelectedPlaygroundRetrieverStore();

  const [link, setLink] = useState("");

  useEffect(() => {
    if (name === "Text Splitter" && selectedSplitOption) {
      const optionLinks =
        SplitOptionLanguages[selectedSplitOption as SplitOption];
      const languageLink = optionLinks.find(
        (option) => option.language === codeExample.language
      )?.link;

      if (!languageLink) {
        aplyToast("No link found");
        return;
      }
      setLink(languageLink);
    }

    if (name === "Vector Store" && selectedVectorStore) {
      const optionLinks =
        VectorStoreLanguages[selectedVectorStore as VectorStoreOption];
      const languageLink = optionLinks.find(
        (option) => option.language === codeExample.language
      )?.link;

      if (!languageLink) {
        aplyToast("No link found");
        return;
      }
      setLink(languageLink);
    }

    if(name === "Retriever" && selectedPlaygroundRetriever) {
      const optionLinks = RetrieverLanguages[selectedPlaygroundRetriever as RetrieverOption];
      const languageLink = optionLinks.find(
        (option) => option.language === codeExample.language
      )?.link;

      if (!languageLink) {
        aplyToast("No link found");
        return;
      }
      setLink(languageLink);
    }
  }, [selectedSplitOption, selectedVectorStore, selectedPlaygroundRetriever, codeExample.language]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { ease: "easeOut", duration: 0.2 } }}
        transition={{ ease: "easeIn", duration: 0.1 }}
        {...props}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7 rounded-[6px] [&_svg]:size-3.5 bg-primary"
            >
              <Code />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Code for {name}</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when youre done.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Select
                  onValueChange={async (value) => {
                    const languageKey = value as LanguageOption;
                    let newLanguageDemo = "";

                    switch (name) {
                      case "Text Splitter":
                        if (selectedSplitOption) {
                          newLanguageDemo = await getTextSplitterCode(
                            selectedSplitOption as SplitOption,
                            languageKey,
                            ""
                          );
                        }

                        setLanguageDemo(newLanguageDemo);
                        setLanguage(languageKey);

                        break;
                      case "Vector Store":
                        if (selectedVectorStore) {
                          newLanguageDemo = await getVectorStoreCode(
                            selectedVectorStore as VectorStoreOption,
                            languageKey,
                            ""
                          );
                        }

                        setLanguageDemo(newLanguageDemo);
                        setLanguage(languageKey);
                        break;

                      case "Retriever":
                        if (selectedPlaygroundRetriever) {
                          newLanguageDemo = await getRetrieverCode(
                            selectedPlaygroundRetriever as RetrieverOption,
                            languageKey,
                            ""
                          );
                        }

                        setLanguageDemo(newLanguageDemo);
                        setLanguage(languageKey);
                        break;
                      default:
                        console.log("No code to update");
                        break;
                    }
                  }}
                  value={codeExample.language}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>

                      {name === "Text Splitter" &&
                        SplitOptionLanguages[
                          selectedSplitOption as SplitOption
                        ]?.map((language, index) => (
                          <SelectItem key={index} value={language.language}>
                            {language.language}
                          </SelectItem>
                        ))}

                      {name === "Vector Store" &&
                        VectorStoreLanguages[
                          selectedVectorStore as VectorStoreOption
                        ]?.map((language, index) => (
                          <SelectItem key={index} value={language.language}>
                            {language.language}
                          </SelectItem>
                        ))}

                      {name === "Retriever" &&
                        RetrieverLanguages[
                          selectedPlaygroundRetriever as RetrieverOption
                        ]?.map((language, index) => (
                          <SelectItem key={index} value={language.language}>
                            {language.language}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <a
                  href={link}
                  target="_blank"
                  className="text-sm text-primary hover:text-primary/80 cursor-pointer"
                >
                  Full documentation
                </a>
              </div>
              <CopyBlock
                language={codeExample.language}
                text={codeExample.languageDemo}
                showLineNumbers={true}
                theme={tomorrowNight}
                codeBlock
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </AnimatePresence>
  );
}
