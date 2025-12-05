import { initNavigation } from "./navigation.js";
import { initFooterDates } from "./date.js";
import { loadDeities, pickDailyDeity, renderDeity } from "./deity.js";
import { initGodCardModal } from "./godcard.js";

initNavigation();
initFooterDates();
initGodCardModal();

loadDeities().then(list => {
    const deity = pickDailyDeity(list);
    renderDeity(deity);
});