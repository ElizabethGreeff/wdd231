import { initNavigation } from "./navigation.js";
import { initFooterDates } from "./date.js";
import { initGodCardModal } from "./godcard.js";
import { loadCreatures, initCreatureFilters } from "./creatures.js";

initNavigation();
initFooterDates();
initGodCardModal();

loadCreatures();
initCreatureFilters();