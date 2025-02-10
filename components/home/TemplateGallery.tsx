"use client";

import { templates } from "@/constants/templates";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

const TemplateGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleTemplateClick = ({
    title,
    initialContent,
  }: {
    title: string;
    initialContent: string;
  }) => {
    setIsCreating(true);
    create({
      title,
      initialContent,
    })
      .then((documentId) => {
        router.push(`/documents/${documentId}`);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  return (
    <div className="max-w-screen-xl w-full mx-auto bg-neutral-100 min-h-[300px] h-full rounded-md mt-4 px-16 py-6">
      <h1 className="font-bold text-2xl">Create new document</h1>
      <Carousel className="mt-6">
        <CarouselContent>
          {templates.map((template) => (
            <CarouselItem
              key={template.id}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.4726374%]"
            >
              <div className="flex flex-col aspect-[3/4]">
                <Button
                  style={{
                    backgroundImage: `url(${template.imageUrl})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="size-full hover:border-blue-500 border-2 bg-white hover:bg-white transition"
                  onClick={() => {
                    handleTemplateClick({
                      title: template.label,
                      initialContent: "",
                    });
                  }}
                />
                <p>{template.label}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default TemplateGallery;
