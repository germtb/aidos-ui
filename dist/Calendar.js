import React, { useMemo } from "react";
import { createJSStyles } from "./Palette";
import { BaseView } from "./BaseView";
const jsStyles = createJSStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        gridTemplateRows: "1fr",
    },
});
const dateFormatter = Intl.DateTimeFormat("en-UK", {
    weekday: "short",
});
const MON = dateFormatter.format(new Date(2000, 1, 7));
const TUE = dateFormatter.format(new Date(2000, 1, 8));
const WED = dateFormatter.format(new Date(2000, 1, 9));
const THU = dateFormatter.format(new Date(2000, 1, 10));
const FRI = dateFormatter.format(new Date(2000, 1, 11));
const SAT = dateFormatter.format(new Date(2000, 1, 12));
const SUN = dateFormatter.format(new Date(2000, 1, 13));
export const Calendar = React.forwardRef(({ date, cell, header, jsStyle, }, ref) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfTheMonth = new Date(year, month, 1).getDay();
    const offset = firstDayOfTheMonth === 0 ? 6 : firstDayOfTheMonth - 1;
    const headers = useMemo(() => {
        return (React.createElement(React.Fragment, null,
            header({ weekday: MON }),
            header({ weekday: TUE }),
            header({ weekday: WED }),
            header({ weekday: THU }),
            header({ weekday: FRI }),
            header({ weekday: SAT }),
            header({ weekday: SUN })));
    }, []);
    return (React.createElement(BaseView, { ref: ref, jsStyle: [jsStyles.container, jsStyle] },
        headers,
        Array.from(Array(offset).keys()).map((index) => {
            const dayDate = new Date(date.getFullYear(), date.getMonth(), index + 1 - offset);
            return (React.createElement(React.Fragment, { key: dayDate.toISOString() }, cell({
                date: dayDate,
                today: false,
                top: true,
                left: index % 7 === 0,
                outOfMonth: true,
                right: false,
                bottom: false,
            })));
        }),
        Array.from(Array(daysInMonth).keys()).map((index) => {
            const dayDate = new Date(date.getFullYear(), date.getMonth(), index + 1, 12 // If we do not add this the ISO string would be from the day before at midnight
            );
            return (React.createElement(React.Fragment, { key: dayDate.toISOString() }, cell({
                date: dayDate,
                top: index + offset < 7,
                left: (index + offset) % 7 === 0,
                right: (index + offset) % 7 === 7 - 1 || index === daysInMonth - 1,
                bottom: index > daysInMonth - 7 - 1,
                outOfMonth: false,
                // today: dayDate.getTime() === new,
            })));
        })));
});
//# sourceMappingURL=Calendar.js.map