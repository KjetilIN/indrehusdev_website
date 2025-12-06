"use client"

import Publication from "./publication";

export default function PublicationsSection() {
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
        <section className="bg-transparent mt-20 antialiased w-full mb-20">
            <div className="min-w-full px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
                        Publications
                    </h2>
                    <p className="mt-6 text-lg font-normal text-neutral-400 sm:text-xl">
                        Research contributions in artificial intelligence and natural language processing.
                    </p>

                    {/* Google Scholar Link */}
                    <div className="mt-6">
                        <a
                            href="https://scholar.google.com/citations?user=YOUR_ID"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors duration-200 font-mono text-sm"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 9a8 8 0 017.162 4.44L24 9.5z"/>
                            </svg>
                            View Google Scholar Profile
                        </a>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {publications.map((publication, index) => (
                        <Publication
                            key={index}
                            title={publication.title}
                            authors={publication.authors}
                            venue={publication.venue}
                            year={publication.year}
                            abstract={publication.abstract}
                            pdfLink={publication.pdfLink}
                            doiLink={publication.doiLink}
                            codeLink={publication.codeLink}
                            conferenceLocation={publication.conferenceLocation}
                            type={publication.type}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
