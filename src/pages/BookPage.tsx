import { useMemo, useState } from "react";
import {
  Building2,
  Video,
  Check,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Wallet,
  Banknote,
  CalendarDays,
  Clock,
} from "lucide-react";
import { useI18n } from "../i18n";
import { useRouter } from "../router";
import { clinics, services } from "../data";
import { Mark, Serif } from "../components/ui";

const TIMES = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];

function nextDays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  for (let i = 1; i <= n; i += 1) {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    out.push(x);
  }
  return out;
}

export default function BookPage() {
  const { t, lang, rtl } = useI18n();
  const { go } = useRouter();

  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"clinic" | "online" | null>(null);
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [pay, setPay] = useState<"card" | "applepay" | "clinic">("card");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [done, setDone] = useState(false);

  const days = useMemo(() => nextDays(8), []);
  const clinic = clinics.find((c) => c.id === clinicId);
  const service = services.find((s) => s.id === serviceId);

  const steps = ["book.s1", "book.s2", "book.s3", "book.s4", "book.s5", "book.s6"];

  const canNext = [
    mode !== null,
    clinicId !== null,
    serviceId !== null,
    day !== null && time !== null,
    form.name.trim() !== "" && form.email.trim() !== "",
    true,
  ][step];

  const price = service?.price ?? 0;
  const currency = clinic?.currency ?? "AED";
  const shown = currency === "QAR" ? Math.round(price * 0.99) : price;
  const ref = useMemo(
    () => `AUR-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    []
  );

  const fmtDay = (d: Date) =>
    d.toLocaleDateString(lang === "ar" ? "ar-AE" : "en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  /* ————————— confirmation ————————— */
  if (done) {
    return (
      <div className="relative z-10 min-h-screen bg-[#F6E4CF] px-5 pt-28 pb-24 md:px-6 md:pt-44 md:pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#321C04]">
            <Check size={28} className="text-[#FFF9F2]" />
          </div>
          <h1 className="mt-8 text-3xl leading-tight font-normal text-[#321C04] md:text-5xl">
            {t("book.doneTitle")}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#321C04]/70">
            {t("book.doneBody")}
          </p>

          <div className="mt-10 rounded-3xl bg-[#FFF9F2] p-6 text-start md:p-8">
            <p className="text-xs font-semibold tracking-widest text-[#321C04]/45 uppercase">
              {t("book.doneRef")} · {ref}
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#321C04]">
              <Row label={t("book.s3")} value={service?.title[lang] ?? "—"} />
              <Row
                label={t("book.s1")}
                value={mode === "online" ? t("book.online") : t("book.inperson")}
              />
              <Row
                label={t("book.s2")}
                value={clinic ? `${clinic.city[lang]} · ${clinic.address[lang]}` : "—"}
              />
              <Row label={t("book.s4")} value={`${day} · ${time}`} />
              <Row
                label={t("book.total")}
                value={price === 0 ? t("book.free") : `${shown} ${currency}`}
              />
            </div>
          </div>

          <button
            onClick={() => go("home")}
            className="mt-10 cursor-pointer rounded-full bg-[#321C04] px-8 py-3.5 text-sm font-medium tracking-wide text-[#FFF9F2] uppercase transition-colors hover:bg-[#1F1003]"
          >
            {t("book.doneHome")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen bg-[#F6E4CF] px-5 pt-24 pb-32 md:px-6 md:pt-44 md:pb-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/30 shadow-[0_10px_30px_rgba(50,28,4,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl md:h-16 md:w-16">
            <Mark size={30} />
          </span>
          <span className="rounded-full bg-[#321C04] px-3.5 py-2 text-[11px] font-semibold tracking-wide text-[#FFF9F2] uppercase">
            {t("book.step")} {step + 1} / 6
          </span>
        </div>

        <p className="mt-6 text-[11px] font-semibold tracking-widest text-[#321C04]/50 uppercase">
          {t("book.title")}
        </p>
        <h1 className="mt-2 text-[2.1rem] leading-[1.05] font-normal text-[#321C04] md:mt-3 md:text-5xl">
          <Serif>{t(steps[step])}</Serif>
        </h1>
        <p className="mt-3 max-w-md text-[13px] leading-relaxed text-[#321C04]/70 md:mt-4 md:text-sm">
          {t("book.sub")}
        </p>

        {/* Progress */}
        <div className="mt-7 flex gap-1.5 md:mt-8 md:gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div
                className={`h-[3px] rounded-full transition-colors duration-500 ${
                  i <= step ? "bg-[#321C04]" : "bg-[#D9C4AA]"
                }`}
              />
              <p
                className={`mt-2 hidden text-[10px] font-semibold tracking-widest uppercase sm:block ${
                  i <= step ? "text-[#321C04]" : "text-[#321C04]/35"
                }`}
              >
                {t(s)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid items-center gap-6 md:mt-10 md:gap-8 lg:grid-cols-[1fr_340px]">
          {/* ————————— panel ————————— */}
          <div className="rounded-3xl bg-[#FFF9F2] p-5 md:p-10">
            {step === 0 && (
              <Block title={t("book.formatQ")}>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <Choice
                    active={mode === "clinic"}
                    onClick={() => setMode("clinic")}
                    icon={<Building2 size={20} />}
                    title={t("book.inperson")}
                    desc={t("book.inpersonDesc")}
                  />
                  <Choice
                    active={mode === "online"}
                    onClick={() => {
                      setMode("online");
                      setClinicId("dubai");
                    }}
                    icon={<Video size={20} />}
                    title={t("book.online")}
                    desc={t("book.onlineDesc")}
                  />
                </div>
              </Block>
            )}

            {step === 1 && (
              <Block title={t("book.locationQ")}>
                {mode === "online" && (
                  <p className="mb-5 rounded-2xl bg-[#F6E4CF] px-4 py-3 text-xs leading-relaxed text-[#321C04]/70">
                    {t("book.onlineNote")}
                  </p>
                )}
                <div className="grid gap-4 sm:grid-cols-3">
                  {clinics.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setClinicId(c.id)}
                      className={`cursor-pointer overflow-hidden rounded-2xl border-2 text-start transition-colors ${
                        clinicId === c.id
                          ? "border-[#321C04] bg-[#F6E4CF]"
                          : "border-transparent bg-[#F6E4CF]/50 hover:bg-[#F6E4CF]"
                      }`}
                    >
                      <img src={c.image} alt="" className="h-24 w-full object-cover" />
                      <div className="p-4">
                        <p className="text-sm font-semibold text-[#321C04]">{c.city[lang]}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#321C04]/60">
                          {c.country[lang]}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </Block>
            )}

            {step === 2 && (
              <Block title={t("book.serviceQ")}>
                <div className="flex flex-col gap-3">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setServiceId(s.id)}
                      className={`flex cursor-pointer flex-col gap-3 rounded-2xl border-2 px-5 py-4 text-start transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
                        serviceId === s.id
                          ? "border-[#321C04] bg-[#F6E4CF]"
                          : "border-transparent bg-[#F6E4CF]/50 hover:bg-[#F6E4CF]"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#321C04]">{s.title[lang]}</p>
                        <p className="mt-1 text-xs leading-relaxed text-[#321C04]/60">
                          {s.desc[lang]}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-baseline gap-2 sm:block sm:text-end">
                        <p className="text-sm font-semibold text-[#321C04]">
                          {s.price === 0 ? t("book.free") : `${s.price} ${currency}`}
                        </p>
                        <p className="text-[11px] text-[#321C04]/55 sm:mt-1">
                          {s.minutes} {t("book.minutes")}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </Block>
            )}

            {step === 3 && (
              <Block title={t("book.timeQ")}>
                <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#321C04]/50 uppercase">
                  <CalendarDays size={14} />
                  {t("book.s4")}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {days.map((d) => {
                    const label = fmtDay(d);
                    return (
                      <button
                        key={label}
                        onClick={() => setDay(label)}
                        className={`cursor-pointer rounded-2xl px-4 py-3 text-xs font-medium transition-colors ${
                          day === label
                            ? "bg-[#321C04] text-[#FFF9F2]"
                            : "bg-[#F6E4CF] text-[#321C04] hover:bg-[#D9C4AA]"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs font-semibold tracking-widest text-[#321C04]/50 uppercase">
                  <Clock size={14} />
                  {clinic?.hours[lang]}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TIMES.map((tm) => (
                    <button
                      key={tm}
                      onClick={() => setTime(tm)}
                      className={`cursor-pointer rounded-2xl px-5 py-3 text-xs font-medium transition-colors ${
                        time === tm
                          ? "bg-[#321C04] text-[#FFF9F2]"
                          : "bg-[#F6E4CF] text-[#321C04] hover:bg-[#D9C4AA]"
                      }`}
                    >
                      {tm}
                    </button>
                  ))}
                </div>
              </Block>
            )}

            {step === 4 && (
              <Block title={t("book.detailsQ")}>
                <div className="flex flex-col gap-4">
                  <Field
                    label={t("book.name")}
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                  />
                  <Field
                    label={t("book.email")}
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                  />
                  <Field
                    label={t("book.phone")}
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                  />
                  <div>
                    <label className="text-[11px] font-semibold tracking-widest text-[#321C04]/55 uppercase">
                      {t("book.notes")}
                    </label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="mt-2 w-full resize-none rounded-2xl bg-[#F6E4CF] px-4 py-3 text-sm text-[#321C04] outline-none focus:ring-2 focus:ring-[#321C04]/20"
                    />
                  </div>
                </div>
              </Block>
            )}

            {step === 5 && (
              <Block title={t("book.paymentQ")}>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {(
                    [
                      ["card", <CreditCard size={18} key="c" />, t("book.card")],
                      ["applepay", <Wallet size={18} key="a" />, t("book.applepay")],
                      ["clinic", <Banknote size={18} key="b" />, t("book.clinic")],
                    ] as const
                  ).map(([id, icon, label]) => (
                    <button
                      key={id}
                      onClick={() => setPay(id)}
                      className={`flex cursor-pointer flex-col items-start gap-2 rounded-2xl border-2 p-3 transition-colors sm:gap-3 sm:p-4 ${
                        pay === id
                          ? "border-[#321C04] bg-[#F6E4CF]"
                          : "border-transparent bg-[#F6E4CF]/50 hover:bg-[#F6E4CF]"
                      }`}
                    >
                      <span className="text-[#321C04]">{icon}</span>
                      <span className="text-[11px] leading-tight font-semibold text-[#321C04] sm:text-xs">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>

                {pay === "card" && (
                  <div className="mt-6 flex flex-col gap-4">
                    <Field label={t("book.cardNumber")} placeholder="4242 4242 4242 4242" />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label={t("book.expiry")} placeholder="12 / 28" />
                      <Field label={t("book.cvc")} placeholder="123" />
                    </div>
                    <Field label={t("book.holder")} placeholder={form.name || "—"} />
                  </div>
                )}

                {pay === "applepay" && (
                  <div className="mt-6 rounded-2xl bg-[#321C04] px-6 py-8 text-center">
                    <p className="text-lg font-semibold text-[#FFF9F2]"> Pay</p>
                    <p className="mt-2 text-xs text-[#FFF9F2]/55">
                      {price === 0 ? t("book.free") : `${shown} ${currency}`}
                    </p>
                  </div>
                )}

                {pay === "clinic" && (
                  <p className="mt-6 rounded-2xl bg-[#F6E4CF] px-5 py-4 text-xs leading-relaxed text-[#321C04]/70">
                    {t("book.clinic")} — {clinic?.address[lang]}
                  </p>
                )}
              </Block>
            )}

            {/* Nav */}
            <div className="mt-8 flex items-center justify-between gap-3 md:mt-10 md:gap-4">
              <button
                onClick={() => (step === 0 ? go("home") : setStep(step - 1))}
                className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[#F6E4CF] px-4 py-3.5 text-xs font-semibold tracking-wide text-[#321C04] uppercase transition-colors hover:bg-[#D9C4AA] md:px-5 md:py-3"
              >
                {rtl ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                {t("book.back")}
              </button>

              <button
                disabled={!canNext}
                onClick={() => (step === 5 ? setDone(true) : setStep(step + 1))}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#321C04] px-5 py-3.5 text-xs font-semibold tracking-wide text-[#FFF9F2] uppercase transition-colors hover:bg-[#1F1003] disabled:cursor-not-allowed disabled:opacity-35 md:flex-none md:px-6 md:py-3"
              >
                {step === 5 ? (pay === "clinic" ? t("book.payLater") : t("book.pay")) : t("book.next")}
                {rtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
              </button>
            </div>
          </div>

          {/* ————————— summary ————————— */}
          <aside className="h-fit self-center rounded-3xl bg-[#321C04] p-6 md:p-7">
            <p className="text-xs font-semibold tracking-widest text-[#F6E4CF]/50 uppercase">
              {t("book.summary")}
            </p>
            <div className="mt-6 flex flex-col gap-4 text-sm">
              <SumRow
                label={t("book.s1")}
                value={mode ? (mode === "online" ? t("book.online") : t("book.inperson")) : "—"}
              />
              <SumRow label={t("book.s2")} value={clinic ? clinic.city[lang] : "—"} />
              <SumRow label={t("book.s3")} value={service ? service.title[lang] : "—"} />
              <SumRow label={t("book.s4")} value={day && time ? `${day} · ${time}` : "—"} />
            </div>
            <div className="mt-6 flex items-baseline justify-between border-t border-[#F6E4CF]/15 pt-5">
              <p className="text-xs font-semibold tracking-widest text-[#F6E4CF]/50 uppercase">
                {t("book.total")}
              </p>
              <p className="text-2xl font-medium text-[#FFF9F2]">
                {!service ? "—" : price === 0 ? t("book.free") : `${shown} ${currency}`}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ————————— small parts ————————— */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg leading-snug font-medium text-[#321C04] md:text-2xl">{title}</h2>
      <div className="mt-5 md:mt-6">{children}</div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 text-start transition-colors sm:flex-col sm:items-start sm:p-6 ${
        active ? "border-[#321C04] bg-[#F6E4CF]" : "border-transparent bg-[#F6E4CF]/50 hover:bg-[#F6E4CF]"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#321C04] text-[#FFF9F2]">
        {icon}
      </span>
      <span className="flex flex-col gap-1 sm:gap-4">
        <span className="text-[15px] font-semibold text-[#321C04] sm:text-base">{title}</span>
        <span className="text-xs leading-relaxed text-[#321C04]/60">{desc}</span>
      </span>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value?: string;
  onChange?: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold tracking-widest text-[#321C04]/55 uppercase">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-2 w-full rounded-2xl bg-[#F6E4CF] px-4 py-3 text-sm text-[#321C04] outline-none placeholder:text-[#321C04]/30 focus:ring-2 focus:ring-[#321C04]/20"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-[#321C04]/10 pb-3 last:border-0">
      <span className="text-xs font-semibold tracking-widest text-[#321C04]/45 uppercase">
        {label}
      </span>
      <span className="text-end text-sm text-[#321C04]">{value}</span>
    </div>
  );
}

function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[11px] font-semibold tracking-widest text-[#F6E4CF]/45 uppercase">
        {label}
      </span>
      <span className="text-end text-sm text-[#FFF9F2]">{value}</span>
    </div>
  );
}
