import RecommendationTab from "../components/main/tabs/RecommendationTab";
import TourChoosingTab from "../components/main/tabs/TourChoosingTab";
import TourChoosingAutomaticTab from "../components/main/tabs/TourChoosingAutomaticTab";

class TabItem {
    constructor(name, number, component) {
        this.name = name;
        this.number = number;
        this.component = component;
    }

}

// const translation = useTranslation();

const TabArray = Object.freeze([
    new TabItem('Рекоммендации', 0, {RecommendationTab}),
    new TabItem('Подбор тура (ручной)', 1, {TourChoosingTab}),
    new TabItem('Подбор тура (автоматический)', 2, {TourChoosingAutomaticTab})
]);
export default TabArray;