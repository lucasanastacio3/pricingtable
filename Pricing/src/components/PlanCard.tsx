import { GetPlan } from "../interface/interfaces";

export const PlanCard: React.FC<GetPlan> = ({ plan }) => {
    const { name, description, price, features } = plan;


    return (
    <div>
        <h2>{name}</h2>
        <p>{description}</p>
        <div className='price'>{price}<span>.99/$ {name}</span></div>
        <ul className="pricing-plan-2 ">
            {features.map((feature: any, index) => (
                <li key={index}>{feature.description}</li>
            ))}
        </ul>
        <button className='btn-basic'>Get Started</button>
    </div>
    );
}