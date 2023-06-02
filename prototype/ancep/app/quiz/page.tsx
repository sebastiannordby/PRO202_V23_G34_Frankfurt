import { HomeArrow } from "../components/HomeArrow";

export const metadata = {
    title: 'Quiz',
  }
  
export default function QuizPage() {
    return(
        <main className="main-layout">
            <HomeArrow />
            
            <div className="content">
                <h1 className="page-title">Aktiviteter</h1>
                <p className="text-lg">Morsomme aktiviteter alene eller med andre</p>
                
                <div 
                    className="mb-32 overflow-auto p-2 mx-auto w-full gap-2 flex flex-col justify-center items-center text-center lg:mb-0 md:flex-row md:flex-wrap lg:text-left mt-6 text-white max-w-3xl">
                    <a
                        href="/quiz/cabin"
                        className="h-32 flex gap-3 items-center card w-full shadow-xl group rounded-lg border border-transparent px-5 py-3 transition-colors hover:border-white"
                        rel="noopener noreferrer">
                            <div className="text-left pl-2">
                            <h2 className={"mb-1 text-2xl font-semibold"}>Tankehytta</h2>
                            <p className={"m-0 max-w-[30ch] text-sm"}>Del dine tanker og reflekter med andre</p>
                        </div>
                    </a>
                    <a
                        href="/quiz/think-provoke"
                        className="h-32 flex gap-3 items-center card w-full shadow-xl group rounded-lg border border-transparent px-5 py-3 transition-colors hover:border-white"
                        rel="noopener noreferrer">
                            <div className="text-left pl-2">
                            <h2 className={"mb-1 text-2xl font-semibold"}>Tankevekker</h2>
                            <p className={"m-0 max-w-[30ch] text-sm"}>Vekk ditt indre</p>
                        </div>
                    </a>
                    <a
                        className="h-32 flex gap-3 items-center card w-full shadow-xl group rounded-lg border border-transparent px-5 py-3 transition-colors hover:border-white"
                        rel="noopener noreferrer">
                            <div className="text-left pl-2">
                            <h2 className={"mb-1 text-2xl font-semibold"}>Morsomme spill</h2>
                            <p className={"m-0 max-w-[30ch] text-sm"}>For hele klassen</p>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    );
}