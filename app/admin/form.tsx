'use client';

import { useFormStatus } from 'react-dom';
import { useState, useEffect } from 'react';
import { deleteGuestbookEntries } from 'app/db/actions';
import { Entry } from 'app/db/queries';
import { cx } from 'app/utils/cx';

export default function Form({ entries }: { entries: Entry[] }) {
  const [selectedInputs, setSelectedInputs] = useState<number[]>([]);
  const [startShiftClickIndex, setStartShiftClickIndex] = useState<number>(0);
  const [isShiftKeyPressed, setIsShiftKeyPressed] = useState(false);
  const [isCommandKeyPressed, setIsCommandKeyPressed] = useState(false);

  useEffect(() => {
    const keyDownHandler = ({ key }: KeyboardEvent) => {
      if (key === 'Shift') {
        setIsShiftKeyPressed(true);
      }
      if (key === 'Meta' || key === 'Control') {
        setIsCommandKeyPressed(true);
      }
    };
    const keyUpHandler = ({ key }: KeyboardEvent) => {
      if (key === 'Shift') {
        setIsShiftKeyPressed(false);
      }
      if (key === 'Meta' || key === 'Control') {
        setIsCommandKeyPressed(false);
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  const handleNormalClick = (checked: boolean, id: number, index: number) => {
    setSelectedInputs((prevInputs) =>
      checked
        ? [...prevInputs, id]
        : prevInputs.filter((inputId) => inputId !== id)
    );
    setStartShiftClickIndex(index);
  };

  const handleCommandClick = (id: number) => {
    setSelectedInputs((prevInputs) =>
      prevInputs.includes(id)
        ? prevInputs.filter((inputId) => inputId !== id)
        : [...prevInputs, id]
    );
  };

  const handleShiftClick = (index: number, checked: boolean) => {
    const startIndex = Math.min(startShiftClickIndex!, index);
    const endIndex = Math.max(startShiftClickIndex!, index);

    setSelectedInputs((prevInputs) => {
      const newSelection = entries
        .slice(startIndex, endIndex + 1)
        .map((item) => item.id);

      if (checked) {
        const combinedSelection = Array.from(
          new Set([...prevInputs, ...newSelection])
        );
        return combinedSelection;
      } else {
        return prevInputs.filter((inputId) => !newSelection.includes(inputId));
      }
    });
  };

  const handleCheck = (checked: boolean, id: number, index: number) => {
    if (isCommandKeyPressed) {
      handleCommandClick(id);
    } else if (isShiftKeyPressed && startShiftClickIndex !== null) {
      handleShiftClick(index, checked);
    } else {
      handleNormalClick(checked, id, index);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: number,
    index: number
  ) => {
    if (event.key === 'Enter') {
      // Check if the checkbox was already selected
      const isChecked = selectedInputs.includes(id);

      // Toggle the checkbox
      handleCheck(!isChecked, id, index);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await deleteGuestbookEntries(selectedInputs);
      }}
    >
      <DeleteButton isActive={selectedInputs.length !== 0} />
      {entries.map((entry, index) => (
        <GuestbookEntry key={entry.id} entry={entry}>
          <input
            name={entry.id.toString()}
            type="checkbox"
            className="mr-2 size-4"
            onChange={(e) => handleCheck(e.target.checked, entry.id, index)}
            onKeyDown={(e) => handleKeyDown(e, entry.id, index)}
            checked={selectedInputs.includes(entry.id)}
          />
        </GuestbookEntry>
      ))}
    </form>
  );
}

function GuestbookEntry({
  entry,
  children,
}: {
  entry: Entry;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col space-y-1">
      <div className="flex w-full items-center text-sm wrap-break-word">
        {children}
        <span className="mr-1 border-neutral-100 text-neutral-600 dark:text-neutral-400">
          {entry.created_by}:
        </span>
        {entry.body}
      </div>
    </div>
  );
}

function DeleteButton({ isActive }: { isActive: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cx(
        'mb-8 inline-flex items-center rounded-sm border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm/4 text-neutral-900 transition-all disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100',
        {
          'bg-red-300/50 dark:bg-red-700/50': isActive,
        }
      )}
      disabled={pending}
      type="submit"
    >
      Delete Entries
    </button>
  );
}
