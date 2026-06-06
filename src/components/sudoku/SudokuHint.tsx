import * as React from "react";
import {hint, SolvingStep} from "sudoku-core";
import {useTranslation} from "react-i18next";
import Button from "src/components/Button";
import {Cell, CellCoordinates} from "src/lib/engine/types";
import {cellsToBoard, squareIndex} from "src/lib/engine/utility";

// Maps sudoku-core strategy titles to our translation key suffixes.
const STRATEGY_KEYS: Record<string, string> = {
  "Open Singles Strategy": "open_singles",
  "Visual Elimination Strategy": "visual_elimination",
  "Single Candidate Strategy": "single_candidate",
  "Naked Pair Strategy": "naked_pair",
  "Pointing Elimination Strategy": "pointing_elimination",
  "Hidden Pair Strategy": "hidden_pair",
};

const indexToCoords = (index: number): CellCoordinates => ({x: index % 9, y: Math.floor(index / 9)});

const HintModal: React.FC<{
  step: SolvingStep;
  sudoku: Cell[];
  selectCell: (cell: CellCoordinates) => void;
  getHint: (cell: CellCoordinates) => void;
  onClose: () => void;
}> = ({step, sudoku, selectCell, getHint, onClose}) => {
  const {t} = useTranslation();
  const [revealed, setRevealed] = React.useState(false);

  const strategyKey = STRATEGY_KEYS[step.strategy];
  const name = strategyKey ? t(`strat_${strategyKey}`) : step.strategy;
  const description = strategyKey ? t(`strat_${strategyKey}_desc`) : "";

  const primary = step.updates[0];
  const coords = primary ? indexToCoords(primary.index) : undefined;

  const revealLocation = () => {
    setRevealed(true);
    if (coords) {
      const cell = sudoku.find((c) => c.x === coords.x && c.y === coords.y);
      if (cell) {
        selectCell(cell);
      }
    }
  };

  const revealNumber = () => {
    if (coords) {
      getHint(coords);
    }
    onClose();
  };

  // Enter advances: first reveals location, then reveals the number (for value steps).
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
        return;
      }
      if (e.key !== "Enter") {
        return;
      }
      e.preventDefault();
      e.stopImmediatePropagation();
      if (!revealed) {
        revealLocation();
      } else if (step.type !== "elimination") {
        revealNumber();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 text-black shadow-xl dark:bg-gray-800 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{`💡 ${t("hint_title")}`}</h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label={t("close")}
          >
            ✕
          </button>
        </div>

        <p className="mb-1 text-sm text-gray-500 dark:text-gray-300">{t("hint_intro")}</p>
        <h3 className="mb-1 text-lg font-bold text-teal-600 dark:text-teal-400">{name}</h3>
        <p className="mb-4">{description}</p>

        {!revealed ? (
          <Button className="w-full bg-teal-600 text-white dark:bg-teal-600" onClick={revealLocation}>
            {t("hint_reveal_location")}
          </Button>
        ) : (
          coords && (
            <div className="grid gap-3">
              <div className="rounded-md bg-gray-100 p-3 dark:bg-gray-700">
                <p>
                  {t("hint_location", {
                    row: coords.y + 1,
                    col: coords.x + 1,
                    box: squareIndex(coords.x, coords.y) + 1,
                  })}
                </p>
                {step.type === "elimination" && primary?.eliminatedCandidate !== undefined && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {t("hint_eliminate", {candidate: primary.eliminatedCandidate})}
                  </p>
                )}
              </div>
              {step.type !== "elimination" && (
                <Button className="w-full bg-red-600 text-white dark:bg-red-600" onClick={revealNumber}>
                  {t("hint_reveal_number")}
                </Button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

const SudokuHint: React.FC<{
  sudoku: Cell[];
  selectCell: (cell: CellCoordinates) => void;
  getHint: (cell: CellCoordinates) => void;
  openSignal?: number;
  disabled?: boolean;
}> = ({sudoku, selectCell, getHint, openSignal, disabled}) => {
  const {t} = useTranslation();
  const [step, setStep] = React.useState<SolvingStep | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const sudokuRef = React.useRef(sudoku);
  sudokuRef.current = sudoku;

  const runHint = () => {
    const result = hint(cellsToBoard(sudokuRef.current));
    if (!result.solved || !result.steps || result.steps.length === 0) {
      setError(t("hint_no_solution"));
      return;
    }
    setError(null);
    setStep(result.steps[0]);
  };

  // Allow opening via keyboard shortcut (parent increments openSignal).
  React.useEffect(() => {
    if (openSignal) {
      runHint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSignal]);

  const close = () => {
    setStep(null);
    setError(null);
  };

  React.useEffect(() => {
    if (!error) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        close();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [error]);

  return (
    <>
      <Button disabled={disabled} onClick={runHint}>
        {t("hint_btn")}
      </Button>
      {step && (
        <HintModal step={step} sudoku={sudoku} selectCell={selectCell} getHint={getHint} onClose={close} />
      )}
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={close}>
          <div
            className="w-full max-w-sm rounded-lg bg-white p-6 text-black shadow-xl dark:bg-gray-800 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <p>{error}</p>
            <Button className="mt-4 w-full" onClick={close}>
              {t("close")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SudokuHint;
