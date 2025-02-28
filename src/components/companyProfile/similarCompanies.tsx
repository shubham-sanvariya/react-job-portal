import {similar} from "@/Data/Company.tsx";
import CompanyCard from "@/components/companyProfile/companyCard.tsx";

const SimilarCompanies = () => {
    return (
        <div className={'w-1/4 px-5'}>
            <div className={'text-xl font-semibold mb-5'}>
                Similar Companies
            </div>
            <div className={'flex flex-col flex-wrap gap-5 '}>
                {
                    similar.map((company,index) => index < 4 && (
                        <CompanyCard key={index} {...company}/>
                    ))
                }
            </div>
        </div>
    )
}
export default SimilarCompanies
