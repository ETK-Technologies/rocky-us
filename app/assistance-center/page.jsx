import AssistanceCards from "@/components/AssistanceCenter/AssistanceCards";
import { assistanceCenterCards } from "@/components/AssistanceCenter/data/assistanceCenterCards";

export default function AssistanceCenter() {
  return (
    <AssistanceCards cards={assistanceCenterCards} title="How may we assist you today?" />
  );
}
