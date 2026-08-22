import { useState } from "react";
import { Box, Typography } from "@mui/material";

import Button from "../components/Button/Button";
import Toggle from "../components/Toggle/Toggle";
import CheckBox from "../components/CheckBox/CheckBox";
import TextField from "../components/TextField/TextField";
import DatePicker from "../components/DatePicker/DatePicker";
import GenericPopup from "../components/GenericPopup/GenericPopup";
import Autocomplete from "../components/Autocomplete/Autocomplete";
import FreeTextInput from "../components/FreeTextInput/FreeTextInput";
import UltraSignature from "../components/UltraSignature/UltraSignature";
import type { IDateRange } from "../components/DatePicker/interfaces/date-range.interface";

const AUTOCOMPLETE_OPTIONS = ["ירושלים", "תל אביב", "חיפה", "באר שבע"];

const FREE_TEXT_ENDPOINT = "http://localhost:4000";

interface ISectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: ISectionProps) => (
  <Box
    sx={{
      gap: 2,
      padding: 2,
      display: "flex",
      borderRadius: "13px",
      flexDirection: "column",
      backgroundColor: "#F6F8FB",
    }}
  >
    <Typography sx={{ fontSize: 18, fontWeight: 700 }}>{title}</Typography>
    {children}
  </Box>
);

const ComponentsShowcase = () => {
  const [text, setText] = useState("");
  const [phone, setPhone] = useState("");
  const [freeText, setFreeText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [toggleValue, setToggleValue] = useState(true);
  const [city, setCity] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<IDateRange>({
    startDate: null,
    endDate: null,
  });

  const handleAsyncConfirm = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
  };

  return (
    <Box
      sx={{
        gap: 3,
        padding: 3,
        display: "flex",
        margin: "0 auto",
        maxWidth: "720px",
        flexDirection: "column",
        fontFamily: "Assistant, sans-serif",
      }}
    >
      <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
        Components Showcase
      </Typography>

      <Section title="TextField">
        <TextField
          type="text"
          value={text}
          title="שם מלא"
          maxLength={20}
          showCharCounter
          onChange={setText}
          infoText="שדה טקסט חופשי"
        />
        <TextField
          type="phone"
          value={phone}
          title="טלפון"
          onChange={setPhone}
          placeholder="05XXXXXXXX"
        />
      </Section>

      <Section title="Autocomplete">
        <Autocomplete
          value={city}
          onChange={setCity}
          options={AUTOCOMPLETE_OPTIONS}
          placeholder="חיפוש עיר"
        />
        <Autocomplete
          isAutocomplete={false}
          value={selectedOption}
          onChange={setSelectedOption}
          options={AUTOCOMPLETE_OPTIONS}
          placeholder="בחר עיר"
        />
        <Typography>נבחר: {city ?? selectedOption ?? "—"}</Typography>
      </Section>

      <Section title="Button">
        <Button text="שמירה" onClick={handleAsyncConfirm} />
        <Button text="ביטול" variant="secondary" onClick={() => {}} />
        <Button text="מושבת" disabled onClick={() => {}} />
      </Section>

      <Section title="CheckBox">
        <CheckBox
          text="אני מאשר את התנאים"
          value={isChecked}
          onChange={setIsChecked}
        />
        <Typography>מאושר: {isChecked ? "כן" : "לא"}</Typography>
      </Section>

      <Section title="Toggle">
        <Toggle
          value={toggleValue}
          setValue={setToggleValue}
          firstValuePlaceHolder="אפשרות א"
          secondValuePlaceHolder="אפשרות ב"
        />
        <Typography>ערך: {String(toggleValue)}</Typography>
      </Section>

      <Section title="DatePicker">
        <DatePicker
          isRange={false}
          value={singleDate}
          onChange={setSingleDate}
        />
        <Typography>
          תאריך: {singleDate ? singleDate.toLocaleDateString() : "—"}
        </Typography>
        <DatePicker isRange value={dateRange} onChange={setDateRange} />
        <Typography>
          טווח: {dateRange.startDate?.toLocaleDateString() ?? "—"} -{" "}
          {dateRange.endDate?.toLocaleDateString() ?? "—"}
        </Typography>
      </Section>

      <Section title="FreeTextInput">
        <FreeTextInput
          value={freeText}
          title="תיאור חופשי"
          onChange={setFreeText}
          placeholder="הקלד תיאור"
          validationEndpoint={FREE_TEXT_ENDPOINT}
        />
      </Section>

      <Section title="UltraSignature">
        <UltraSignature isSigned={isSigned} setIsSigned={setIsSigned} />
        <Typography>חתום: {isSigned ? "כן" : "לא"}</Typography>
      </Section>

      <Section title="GenericPopup">
        <Button text="פתיחת פופאפ" onClick={() => setIsPopupOpen(true)} />
        <GenericPopup
          icon="WARNING"
          open={isPopupOpen}
          title="אישור פעולה"
          align="center"
          guidelines="לא ניתן לבטל את הפעולה לאחר האישור"
          onClose={() => setIsPopupOpen(false)}
          content={<Typography>האם להמשיך בפעולה?</Typography>}
          buttons={{
            primary: { text: "אישור", onClick: handleAsyncConfirm },
            secondary: { text: "ביטול", onClick: () => {} },
          }}
        />
      </Section>
    </Box>
  );
};

export default ComponentsShowcase;
