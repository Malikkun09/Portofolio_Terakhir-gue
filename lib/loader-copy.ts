export type PhraseFace = "space" | "serif" | "geist" | "mono";

export type LoaderPhrase = {
  text: string;
  face: PhraseFace;
  italic?: boolean;
  weight?: "medium" | "bold";
  tracking?: "tight" | "wide";
  stagger?: boolean;
};

export const loaderPhrases: LoaderPhrase[] = [
  {
    text: "Build Beyond Limits",
    face: "space",
    weight: "bold",
    tracking: "tight",
  },
  {
    text: "Create With Purpose",
    face: "serif",
    italic: true,
    stagger: true,
  },
  { text: "Progress Over Perfection", face: "geist", weight: "medium" },
  { text: "Code Your Own Future", face: "mono" },
  { text: "Stay Curious Always", face: "space" },
  { text: "Make Every Pixel Count", face: "serif" },
  { text: "Small Steps, Big Impact", face: "geist" },
  { text: "Keep Exploring Possibilities", face: "space", weight: "medium" },
  { text: "Build Something Meaningful", face: "serif" },
  { text: "Turn Ideas Into Reality", face: "mono", tracking: "wide" },
];

export const LOADER_SESSION_KEY = "pf-loader-seen";
export const SPARKS_EVENT = "pf-sparks";
