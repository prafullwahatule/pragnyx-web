import { getAllLearningTracks } from "@/lib/repo/learningTracks";
import LearningTracksManager from "@/components/admin/LearningTracksManager";

export default async function AdminLearningTracksPage() {
  const tracks = await getAllLearningTracks();
  return <LearningTracksManager initialItems={tracks} />;
}
