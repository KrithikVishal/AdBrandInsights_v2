import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  onDateChange?: (dates: { from: Date | null; to: Date | null }) => void;
}

export function DatePickerWithRange({ onDateChange }: DatePickerWithRangeProps) {
  const [dates, setDates] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null
  });

  const handleDateChange = (newDates: { from: Date | null; to: Date | null }) => {
    setDates(newDates);
    onDateChange?.(newDates);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[240px] pl-3 text-left">
          <Calendar className="mr-2 h-4 w-4" />
          {dates.from ? (
            dates.to ? (
              `${dates.from.toLocaleDateString()} - ${dates.to.toLocaleDateString()}`
            ) : (
              dates.from.toLocaleDateString()
            )
          ) : (
            "Pick a date range"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Date range picker placeholder
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}