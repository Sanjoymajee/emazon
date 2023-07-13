"use client";

import { useState } from "react";

export default function AddTag() {
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");

  const clearPlaceholderInput = () => {
    const input = document.getElementById(
      "placeholder-tags",
    ) as HTMLInputElement;
    input.value = "";
    input.focus();
  };

  const removeTag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const tag = e.currentTarget.textContent;
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    setInputValue(updatedTags);
  };

  const setInputValue = (tagArray: string[]) => {
    const input = document.getElementById("tags") as HTMLInputElement;
    input.value = tagArray.join(",");
  };

  const checkTag = (newTag: string): boolean => {
    const regex = /^[a-zA-Z0-9]+$/;
    if (newTag.length < 1) return false;
    if (!regex.test(newTag)) return false;
    return !tags.some((t) => t.toLowerCase() === newTag.toLowerCase());
  };
  const getUniqueTags = (newTagArray: string[]): string[] => {
    newTagArray.sort();
    const newTags = newTagArray.map((newTag, index) => {
      newTag.trim();
      if (index < newTagArray.length - 1 && newTagArray[index + 1] === newTag)
        return "";
      else return newTag;
    });
    const uniqueTags = newTags.filter((newTag) => {
      return checkTag(newTag);
    });
    return uniqueTags;
  };

  const addTag = () => {
    const newTagArray = tag.split(" ").join("").split(",");
    const uniqueTags = getUniqueTags(newTagArray);
    if (uniqueTags[0] === "") return clearPlaceholderInput();
    const updatedTags = [...tags, ...uniqueTags];
    setTags(updatedTags);
    setTag("");
    setInputValue(updatedTags);
    clearPlaceholderInput();
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="tags" className="text-gray-200 mb-1">
        Tags
      </label>
      <div className="join">
        <input
          id="placeholder-tags"
          type="text"
          className="input border-none input-bordered join-item input-primary w-full max-w-2xl mb-2"
          placeholder="eg. electronics, gadgets, etc."
          onChange={(e) => setTag(e.target.value)}
        />
        <input type="text" className="hidden" name="tags" id="tags" />
        <button
          type="button"
          className="btn join-item rounded-r-full bg-base-100"
          onClick={() => addTag()}
        >
          Add Tag
        </button>
      </div>
      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <div
            key={tag}
            className="badge m-1 hover:badge-outline badge-info gap-2 hover:cursor-pointer"
            onClick={(e) => removeTag(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-4 h-4 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>

            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
