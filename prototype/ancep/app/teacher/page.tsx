import { HomeArrow } from "../components/HomeArrow";

export const metadata = {
    title: 'Lærer',
};

  
export default function QuizPage() {
    return(
        <main className="main-layout">
            <HomeArrow />
            
            <div className="content">
                <h1 className="page-title">Undervisnings veiledning</h1>
                <p className="font-medium text-md">Enkel guide til hvordan du som lærer kan bruke vår plattform</p>
            </div>
        </main>
    );
}