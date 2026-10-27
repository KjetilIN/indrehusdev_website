import Publication from "./publication";

export default function Publications() {
    const publications = [
        {
            title: "SemQA: Evaluating Evidence with Question Embeddings and Answer Entailment for Fact Verification",
            authors: ["Kjetil Indrehus", "Caroline Vannebo", "Roxana Pop"],
            venue: "Proceedings of the Eighth Fact Extraction and VERification Workshop (FEVER)",
            year: "2025",
            abstract: "We propose SemQA, a metric combining transformer-based question scoring with bidirectional NLI entailment for automated fact-checking. While existing frameworks like Ev²R offer semantic grounding, they demand significant computational resources, whereas simpler overlap-based metrics frequently diverge from human judgment. We evaluate our approach through human assessments and metric correlation analyses.",
            pdfLink: "https://aclanthology.org/2025.fever-1.14.pdf",
            doiLink: "https://doi.org/10.18653/v1/2025.fever-1.14",
            conferenceLocation: "Vienna, Austria",
            type: "workshop" as const
        },
        {
            title: "NORA's Annual Conference 2025",
            authors: ["Multiple Authors including Kjetil Indrehus"],
            venue: "Nordic Machine Intelligence Journal, Vol. 5 No. 3",
            year: "2025",
            abstract: "Proceedings from NORA's annual conference showcasing research in artificial intelligence and machine learning from the Nordic region. Poster presentation of my M.Sc. thesis proposal.",
            pdfLink: "https://journals.uio.no/NMI/article/view/12551",
            conferenceLocation: "Halden, Norway",
            type: "proceedings" as const
        },
        {
            title: "User Face Tracking For Unreal Interface",
            authors: ["Kjetil Indrehus", "Sander Hauge", "Martin Johannessen"],
            venue: "NTNU - Norwegian University of Science and Technology",
            year: "2024",
            abstract: "This bachelor thesis develops a system using Unreal Engine and face tracking to replicate the experience of looking through a window into a virtual world without 3D glasses. The system uses a camera to track the user's face and eye direction, re-rendering scenes in real-time to maintain the illusion of 3D objects fixed in space from the user's perspective. The final product consists of a face tracking server in Python and a UE-client.",
            pdfLink: "https://nva.sikt.no/registration/0198ea9fde15-c4fb1d55-86c9-43ab-89bd-92b90f2ed4c2",
            codeLink: "https://github.com/RIT-NTNU-Bachelor",
            conferenceLocation: "Gjøvik, Norway",
            type: "thesis" as const
        }
    ];

    return (
        <div className="space-y-4">
            {publications.map((publication) => (
                <Publication key={publication.title} {...publication} />
            ))}
        </div>
    );
}
