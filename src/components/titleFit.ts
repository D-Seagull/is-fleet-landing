// Advance widths of Manrope ExtraBold (800) with the hero title's -0.045em tracking, in
// thousandths of an em — measured in the browser. Lets the server size the headline so its
// widest line fills the copy column in any language, before the font has even loaded.
const CHARS = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZąćęłńóśźżĄĆĘŁŃÓŚŹŻčėįšųūžČĖĮŠŲŪŽäöüßÄÖÜабвгґдеєжзиіїйклмнопрстуфхцчшщьюяъыэёАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯЪЫЭЁ'’.,!-–—&";
const WIDTHS = [155,538,579,538,580,563,341,579,591,251,256,507,251,871,591,582,579,580,367,502,399,591,523,769,518,525,490,638,592,701,665,545,485,696,689,251,468,620,496,815,684,713,605,713,625,626,565,681,608,944,627,585,635,538,538,563,361,591,582,502,490,490,638,701,545,516,684,713,626,635,635,538,563,251,502,591,591,490,701,545,251,626,681,681,635,538,582,591,601,638,713,681,538,559,522,440,440,600,563,539,743,480,576,251,251,576,507,570,690,588,582,576,579,538,495,525,719,518,619,541,756,740,535,826,549,566,717,539,563,638,605,592,505,515,712,545,680,879,622,684,251,251,684,620,685,815,689,713,689,605,701,565,596,703,627,716,641,915,936,614,911,625,627,852,680,545,231,260,275,271,331,375,495,735,629];
const width = new Map([...CHARS].map((c, i) => [c, WIDTHS[i]]));
/** Unknown characters count as wide, so the estimate errs on the small side. */
const FALLBACK = 720;

/** Width of a line of the hero title, in em. */
export function titleLineEm(line: string): number {
  let total = 0;
  for (const c of line) total += width.get(c) ?? FALLBACK;
  return total / 1000;
}
