import Container from "@/components/AssistanceCenter/Container";
import Section from "@/components/utils/Section";

const cards = [
    {
        id : 1,
        category: "Erectile Dysfunction",
        title : "Get Confidence Back in Bed",
        img : "https://myrocky.b-cdn.net/WP%20Images/Homepage/ed-leading.webp",
        to : "/ed-pre-consultation-quiz/",
        btn : "Get Started"
    },
    {
        id : 2,
        category: "Weight Loss",
        title : "Lose Weight With Science",
        img : "https://myrocky.b-cdn.net/WP%20Images/Homepage/wl-section.webp",
        to : "/wl-pre-consultation",
        btn : "Am I Eligible?"
    },
    {
        id : 3,
        category: "Hair Loss",
        title : "Hair Treatment Formulated for You",
        img : "https://myrocky.b-cdn.net/WP%20Images/Homepage/hair-leading.webp",
        to :"/hair-flow",
        btn : "Get Started",
    },
];

export default function AssistanceCenter(){
  return (
    <>
     <Container cards={cards} title="How may we assist you today?"></Container>
    </>
  );
}
