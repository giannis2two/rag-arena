"use client";
import Header from "@/components/theme/header";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import {
  useInMemoryStore,
  useSelectedPlaygroundLlmStore,
  useSelectedPlaygroundRetrieverStore,
  useSplitResultStore,
} from "@/lib/zustand";
import PlaygroundChat from "./components/chat";
import LlmSelectorBox from "./components/llm-selector-box";
import RetrieverSelectorBox from "./components/retriever-selector-box";
import TextSplitterBox from "./components/text-splitter-box";
import VectorStoreBox from "./components/vector-store-box";

export default function PlaygroundPage() {
  const { splitResult } = useSplitResultStore();
  const { inMemory } = useInMemoryStore();
  const { selectedPlaygroundLlm } = useSelectedPlaygroundLlmStore();
  const { selectedPlaygroundRetriever } = useSelectedPlaygroundRetrieverStore();

  return (
    <>
      <Header />
      <div className="p-10 flex max-w-[1480px] justify-center m-auto w-full">
        <div className="grid grid-cols-6 grid-rows-2 gap-4 w-full">
          <HoverBorderGradient
            containerClassName="rounded-md col-span-2 row-span-1 min-w-full"
            as="div"
            className="w-full rounded-md h-full"
            stopAnimation={splitResult.length !== 0}
            withHighlight={splitResult.length === 0}
            duration={3}
          >
            <TextSplitterBox />
          </HoverBorderGradient>

          <HoverBorderGradient
            containerClassName="rounded-md col-span-2 row-span-1 min-w-full"
            as="div"
            className="w-full rounded-md"
            stopAnimation={inMemory}
            duration={3}
          >
            <VectorStoreBox />
          </HoverBorderGradient>

          <div className="col-span-2 row-span-2 min-h-max">
            <PlaygroundChat />
          </div>

          <HoverBorderGradient
            containerClassName="rounded-md col-span-2 row-span-1 min-w-full"
            as="div"
            className="w-full rounded-md h-[220px]"
            stopAnimation={selectedPlaygroundRetriever !== ""}
            duration={3}
          >
            <RetrieverSelectorBox />
          </HoverBorderGradient>

          <HoverBorderGradient
            containerClassName="rounded-md col-span-2 row-span-1 min-w-full"
            as="div"
            className="w-full rounded-md h-[220px]"
            stopAnimation={selectedPlaygroundLlm !== ""}
            duration={3}
          >
            <LlmSelectorBox />
          </HoverBorderGradient>
        </div>
      </div>
    </>
  );
}
