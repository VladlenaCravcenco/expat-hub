import { ArrowDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLanguage } from '../context/LanguageContext';
import type { Lang } from '../i18n/translations';
import { sendToTelegram } from '../utils/telegram';
import '../../styles/events.css';

const eventContent: Record<Lang, {
  month: string;
  seats: string;
  start: string;
  title: string;
  subtitle: string;
  leftTitle: string;
  leftText: string;
  rightTitle: string;
  rightText: string;
  total: string;
  places: string;
  cta: string;
}> = {
  ro: {
    month: 'IUNIE',
    seats: 'LOCURI',
    start: 'ÎNCEPUT: 18:00',
    title: 'SEMINAR PRACTIC',
    subtitle: 'contabilitate · administrarea companiei',
    leftTitle: 'Contabil și administrator:',
    leftText: 'cine și pentru ce răspunde în companie?',
    rightTitle: 'Ce trebuie verificat',
    rightText: 'de fiecare antreprenor până la sfârșitul anului 2026',
    total: 'În total',
    places: 'locuri',
    cta: 'REZERVĂ PARTICIPAREA',
  },
  ru: {
    month: 'ИЮНЯ',
    seats: 'МЕСТ',
    start: 'НАЧАЛО: 18:00',
    title: 'ПРАКТИЧЕСКИЙ СЕМИНАР',
    subtitle: 'бухгалтерия · администрирование компании',
    leftTitle: 'Бухгалтер и администратор:',
    leftText: 'кто за что отвечает в компании?',
    rightTitle: 'Что должен проверить',
    rightText: 'каждый предприниматель до конца 2026 года',
    total: 'Всего',
    places: 'мест',
    cta: 'ЗАБРОНИРОВАТЬ УЧАСТИЕ',
  },
  en: {
    month: 'JUNE',
    seats: 'SEATS',
    start: 'START: 18:00',
    title: 'PRACTICAL SEMINAR',
    subtitle: 'accounting · company administration',
    leftTitle: 'Accountant and administrator:',
    leftText: 'who is responsible for what in the company?',
    rightTitle: 'What must be checked',
    rightText: 'by every entrepreneur before the end of 2026',
    total: 'Total',
    places: 'seats',
    cta: 'RESERVE YOUR PLACE',
  },
  uk: {
    month: 'ЧЕРВНЯ',
    seats: 'МІСЦЬ',
    start: 'ПОЧАТОК: 18:00',
    title: 'ПРАКТИЧНИЙ СЕМІНАР',
    subtitle: 'бухгалтерія · адміністрування компанії',
    leftTitle: 'Бухгалтер і адміністратор:',
    leftText: 'хто за що відповідає у компанії?',
    rightTitle: 'Що має перевірити',
    rightText: 'кожен підприємець до кінця 2026 року',
    total: 'Всього',
    places: 'місць',
    cta: 'ЗАБРОНЮВАТИ УЧАСТЬ',
  },
};

const audienceContent: Record<Lang, {
  title: string;
  cards: { title: string; text: string }[];
}> = {
  ro: {
    title: 'PENTRU CINE ESTE ACEASTĂ ÎNTÂLNIRE',
    cards: [
      { title: 'Proprietari de afaceri', text: 'Vor să verifice procesele și să elimine greșelile înainte de sfârșitul anului.' },
      { title: 'Conducători de companii', text: 'Vor să înțeleagă clar zonele de responsabilitate ale angajaților.' },
      { title: 'Antreprenori la început de drum', text: 'Planifică dezvoltarea și scalarea afacerii.' },
      { title: 'Administratori și manageri', text: 'Vor să construiască un sistem de lucru transparent.' },
    ],
  },
  ru: {
    title: 'ДЛЯ КОГО ЭТА ВСТРЕЧА',
    cards: [
      { title: 'Владельцы бизнеса', text: 'Хотят проверить процессы и исключить ошибки перед завершением года.' },
      { title: 'Руководители компаний', text: 'Хотят понимать зоны ответственности сотрудников.' },
      { title: 'Начинающие предприниматели', text: 'Планируют масштабирование бизнеса.' },
      { title: 'Администраторы и менеджеры', text: 'Хотят выстроить прозрачную систему работы.' },
    ],
  },
  en: {
    title: 'WHO THIS MEETING IS FOR',
    cards: [
      { title: 'Business owners', text: 'Want to review processes and eliminate mistakes before the end of the year.' },
      { title: 'Company leaders', text: 'Want to understand employee responsibilities clearly.' },
      { title: 'New entrepreneurs', text: 'Are planning to scale their business.' },
      { title: 'Administrators and managers', text: 'Want to build a transparent operating system.' },
    ],
  },
  uk: {
    title: 'ДЛЯ КОГО ЦЯ ЗУСТРІЧ',
    cards: [
      { title: 'Власники бізнесу', text: 'Хочуть перевірити процеси та виключити помилки до завершення року.' },
      { title: 'Керівники компаній', text: 'Хочуть розуміти зони відповідальності співробітників.' },
      { title: 'Підприємці-початківці', text: 'Планують масштабування бізнесу.' },
      { title: 'Адміністратори та менеджери', text: 'Хочуть побудувати прозору систему роботи.' },
    ],
  },
};

const speakerContent: Record<Lang, {
  sectionTitle: string;
  name: string;
  role: string;
  intro?: string;
  background?: string;
  credentials: string[];
  specializes: string;
  specializations: string[];
  experience?: string;
  believes: string;
  belief: string;
  work: string;
  workText: string;
  cta: string;
}> = {
  ro: {
    sectionTitle: 'SPEAKERII EVENIMENTULUI',
    name: 'Natalia Mardari',
    role: 'Expert contabil CECCAR',
    credentials: ['Expert contabil', 'Membru CECCAR', 'Consultant financiar', 'Fondator NASTALSI EXPERT SRL'],
    specializes: 'Specializată în:',
    specializations: ['asistență contabilă', 'consultanță fiscală', 'suport financiar pentru afaceri'],
    believes: 'Consideră',
    belief: 'că încrederea, profesionalismul și parteneriatul pe termen lung sunt baza unei colaborări de succes.',
    work: 'În activitate',
    workText: 'pune accent pe transparență, atenție la detalii și o abordare individuală pentru fiecare client.',
    cta: 'PARTICIPĂ LA SEMINAR',
  },
  ru: {
    sectionTitle: 'СПИКЕРЫ МЕРОПРИЯТИЯ',
    name: 'Наталья Мардарь',
    role: 'Бухгалтер эксперт CECCAR',
    credentials: ['Бухгалтер-эксперт', 'Член CECCAR', 'Финансовый консультант', 'Соучредитель NASTALSI EXPERT SRL'],
    specializes: 'Специализирующаяся на:',
    specializations: ['бухгалтерском сопровождении', 'налоговом консультировании', 'финансовой поддержке бизнеса'],
    believes: 'Считает',
    belief: 'основой успешного сотрудничества доверие, профессионализм и долгосрочное партнерство.',
    work: 'В работе',
    workText: 'делает акцент на прозрачности, внимании к деталям и индивидуальном подходе к каждому клиенту.',
    cta: 'УЧАСТВОВАТЬ В СЕМИНАРЕ',
  },
  en: {
    sectionTitle: 'EVENT SPEAKERS',
    name: 'Natalia Mardari',
    role: 'CECCAR expert accountant',
    credentials: ['Expert accountant', 'CECCAR member', 'Financial consultant', 'Co-founder of NASTALSI EXPERT SRL'],
    specializes: 'Specializes in:',
    specializations: ['accounting support', 'tax consulting', 'financial support for businesses'],
    believes: 'Believes',
    belief: 'that trust, professionalism and long-term partnership are the foundation of successful cooperation.',
    work: 'At work',
    workText: 'she focuses on transparency, attention to detail and an individual approach to every client.',
    cta: 'JOIN THE SEMINAR',
  },
  uk: {
    sectionTitle: 'СПІКЕРИ ЗАХОДУ',
    name: 'Наталія Мардар',
    role: 'Бухгалтер-експерт CECCAR',
    credentials: ['Бухгалтер-експерт', 'Член CECCAR', 'Фінансовий консультант', 'Співзасновник NASTALSI EXPERT SRL'],
    specializes: 'Спеціалізується на:',
    specializations: ['бухгалтерському супроводі', 'податковому консультуванні', 'фінансовій підтримці бізнесу'],
    believes: 'Вважає',
    belief: 'основою успішної співпраці довіру, професіоналізм і довгострокове партнерство.',
    work: 'У роботі',
    workText: 'робить акцент на прозорості, увазі до деталей та індивідуальному підході до кожного клієнта.',
    cta: 'ВЗЯТИ УЧАСТЬ У СЕМІНАРІ',
  },
};

const secondSpeakerContent: Record<Lang, Omit<(typeof speakerContent)[Lang], 'sectionTitle' | 'cta'>> = {
  ro: {
    name: 'Aliona Pantelei',
    role: 'Jurist | Fondatoarea Pantelei Legal Consulting',
    intro: 'Jurist cu peste 11 ani de experiență în practica juridică din România.',
    background: 'Locuiește în România de peste 24 de ani și înțelege în profunzime particularitățile mediului juridic și de afaceri românesc, ceea ce îi permite să ofere asistență eficientă atât antreprenorilor locali, cât și investitorilor străini care deschid sau dezvoltă afaceri în țară.',
    credentials: ['Peste 11 ani de practică juridică', 'Peste 24 de ani în România', 'Drept corporativ și migrațional', 'Fondatoarea Pantelei Legal Consulting'],
    specializes: 'Specializată în:',
    specializations: ['drept corporativ și asistență juridică pentru afaceri', 'înregistrarea și administrarea companiilor în România', 'dreptul migrației, permis de ședere temporară, permanentă și cetățenia română'],
    experience: 'De-a lungul anilor de practică, a asistat cu succes antreprenori și companii în soluționarea problemelor juridice legate de afaceri, investiții și relocarea în România.',
    believes: 'Este convinsă',
    belief: 'că o afacere stabilă începe cu securitate juridică, respectarea legislației și gestionarea competentă a riscurilor.',
    work: 'În activitatea sa',
    workText: 'pune accent pe soluții practice, abordare individuală și asistență pe termen lung pentru clienți.',
  },
  ru: {
    name: 'Алёна Пантелей',
    role: 'Юрист | Основатель Pantelei Legal Consulting',
    intro: 'Юрист с более чем 11-летним опытом юридической практики в Румынии.',
    background: 'Проживает в Румынии более 24 лет и глубоко понимает особенности румынской правовой и деловой среды, что позволяет эффективно сопровождать как местных предпринимателей, так и иностранных инвесторов, открывающих или развивающих бизнес в стране.',
    credentials: ['Более 11 лет юридической практики', 'Более 24 лет в Румынии', 'Корпоративное и миграционное право', 'Основатель Pantelei Legal Consulting'],
    specializes: 'Специализируется на:',
    specializations: ['корпоративном праве и юридическом сопровождении бизнеса', 'регистрации и администрировании компаний в Румынии', 'миграционном праве, вопросах ВНЖ, ПМЖ и гражданства Румынии'],
    experience: 'За годы практики успешно сопровождала предпринимателей и компании в решении юридических вопросов, связанных с ведением бизнеса, инвестициями и переездом в Румынию.',
    believes: 'Уверена',
    belief: 'что стабильный бизнес начинается с юридической безопасности, соблюдения законодательства и грамотного управления рисками.',
    work: 'В своей работе',
    workText: 'делает акцент на практических решениях, индивидуальном подходе и долгосрочном сопровождении клиентов.',
  },
  en: {
    name: 'Aliona Pantelei',
    role: 'Lawyer | Founder of Pantelei Legal Consulting',
    intro: 'A lawyer with more than 11 years of legal practice in Romania.',
    background: 'She has lived in Romania for more than 24 years and deeply understands the Romanian legal and business environment, enabling her to effectively support both local entrepreneurs and foreign investors opening or developing businesses in the country.',
    credentials: ['More than 11 years of legal practice', 'More than 24 years in Romania', 'Corporate and migration law', 'Founder of Pantelei Legal Consulting'],
    specializes: 'Specializes in:',
    specializations: ['corporate law and legal support for businesses', 'company registration and administration in Romania', 'migration law, temporary and permanent residence, and Romanian citizenship'],
    experience: 'Throughout her practice, she has successfully supported entrepreneurs and companies in resolving legal matters related to business operations, investments and relocation to Romania.',
    believes: 'Is confident',
    belief: 'that a stable business begins with legal security, compliance with legislation and competent risk management.',
    work: 'In her work',
    workText: 'she focuses on practical solutions, an individual approach and long-term client support.',
  },
  uk: {
    name: 'Альона Пантелей',
    role: 'Юрист | Засновниця Pantelei Legal Consulting',
    intro: 'Юрист із більш ніж 11-річним досвідом юридичної практики в Румунії.',
    background: 'Проживає в Румунії понад 24 роки та глибоко розуміє особливості румунського правового й ділового середовища, що дозволяє ефективно супроводжувати як місцевих підприємців, так і іноземних інвесторів, які відкривають або розвивають бізнес у країні.',
    credentials: ['Понад 11 років юридичної практики', 'Понад 24 роки в Румунії', 'Корпоративне та міграційне право', 'Засновниця Pantelei Legal Consulting'],
    specializes: 'Спеціалізується на:',
    specializations: ['корпоративному праві та юридичному супроводі бізнесу', 'реєстрації й адмініструванні компаній у Румунії', 'міграційному праві, питаннях тимчасового й постійного проживання та громадянства Румунії'],
    experience: 'За роки практики успішно супроводжувала підприємців і компанії у вирішенні юридичних питань, пов’язаних із веденням бізнесу, інвестиціями та переїздом до Румунії.',
    believes: 'Переконана',
    belief: 'що стабільний бізнес починається з юридичної безпеки, дотримання законодавства та грамотного управління ризиками.',
    work: 'У своїй роботі',
    workText: 'робить акцент на практичних рішеннях, індивідуальному підході та довгостроковому супроводі клієнтів.',
  },
};

const outcomesContent: Record<Lang, {
  title: string;
  cards: { title: string; text: string }[];
}> = {
  ro: {
    title: 'DUPĂ SEMINAR VEȚI:',
    cards: [
      { title: 'Înțelege clar responsabilitățile contabilului și administratorului', text: 'Cine răspunde pentru documente, finanțe, procese, angajați și controlul activității companiei.' },
      { title: 'Afla ce trebuie realizat până la sfârșitul anului 2026', text: 'Ce obligații față de autoritățile publice nu pot fi ignorate și ce termene trebuie respectate.' },
      { title: 'Primi răspunsuri la întrebări de la experți practicieni', text: 'Contabilitate, suport juridic, administrarea afacerii, documente și obligațiile companiei într-un singur loc.' },
      { title: 'Reduce riscul amenzilor și greșelilor', text: 'Veți analiza încălcările tipice comise de antreprenorii din România și veți afla cum să le evitați.' },
    ],
  },
  ru: {
    title: 'ПОСЛЕ СЕМИНАРА ВЫ:',
    cards: [
      { title: 'Четко поймёте зоны ответственности бухгалтера и администратора', text: 'Кто отвечает за документы, финансы, процессы, сотрудников и контроль работы компании.' },
      { title: 'Узнаете, что необходимо выполнить до конца 2026 года', text: 'Какие обязательства перед государственными органами нельзя игнорировать и какие сроки важно соблюдать.' },
      { title: 'Получите ответы на свои вопросы от практикующих экспертов', text: 'Бухгалтерия, юридическое сопровождение, администрирование бизнеса, документы и обязательства компании в одном месте.' },
      { title: 'Снизите риски штрафов и ошибок', text: 'Разберёте типичные нарушения, которые допускают предприниматели в Румынии, и узнаете, как их избежать.' },
    ],
  },
  en: {
    title: 'AFTER THE SEMINAR YOU WILL:',
    cards: [
      { title: 'Clearly understand the responsibilities of the accountant and administrator', text: 'Who is responsible for documents, finances, processes, employees and company oversight.' },
      { title: 'Know what must be completed before the end of 2026', text: 'Which obligations to public authorities cannot be ignored and which deadlines must be met.' },
      { title: 'Get answers from practicing experts', text: 'Accounting, legal support, business administration, documents and company obligations in one place.' },
      { title: 'Reduce the risk of fines and mistakes', text: 'Review common violations made by entrepreneurs in Romania and learn how to avoid them.' },
    ],
  },
  uk: {
    title: 'ПІСЛЯ СЕМІНАРУ ВИ:',
    cards: [
      { title: 'Чітко зрозумієте зони відповідальності бухгалтера й адміністратора', text: 'Хто відповідає за документи, фінанси, процеси, співробітників і контроль роботи компанії.' },
      { title: 'Дізнаєтеся, що необхідно виконати до кінця 2026 року', text: 'Які зобов’язання перед державними органами не можна ігнорувати та яких строків важливо дотримуватися.' },
      { title: 'Отримаєте відповіді від практикуючих експертів', text: 'Бухгалтерія, юридичний супровід, адміністрування бізнесу, документи та зобов’язання компанії в одному місці.' },
      { title: 'Знизите ризики штрафів і помилок', text: 'Розберете типові порушення підприємців у Румунії та дізнаєтеся, як їх уникнути.' },
    ],
  },
};

const registrationContent: Record<Lang, {
  title: string; priceLabel: string; places: string; remaining: string; notice: string;
  date: string; time: string; format: string; live: string; name: string; phone: string;
  email: string; participant: string; individual: string; company: string; telegram: string;
  consent: string; privacy: string; submit: string; sending: string; error: string;
}> = {
  ro: { title: 'COMPLETAȚI FORMULARUL PENTRU A AFLA PERSONAL TOATE DETALIILE EVENIMENTULUI', priceLabel: 'Costul participării', places: 'locuri', remaining: 'Au rămas:', notice: 'Numărul participanților este limitat. După înregistrare, un manager vă va contacta pentru confirmarea participării.', date: 'Data', time: 'Ora', format: 'Format', live: 'Întâlnire fizică', name: 'Nume și prenume', phone: 'Telefon', email: 'Email', participant: 'Tip participant', individual: 'Persoană fizică', company: 'Persoană juridică', telegram: 'Telegram', consent: 'Prin trimiterea cererii acceptați prelucrarea datelor personale și', privacy: 'politica de confidențialitate.', submit: 'CONFIRMĂ PARTICIPAREA', sending: 'SE TRIMITE...', error: 'Cererea nu a putut fi trimisă. Încercați din nou.' },
  ru: { title: 'ЗАПОЛНИТЕ ФОРМУ, ЧТОБЫ ЛИЧНО УЗНАТЬ ВСЕ ДЕТАЛИ МЕРОПРИЯТИЯ', priceLabel: 'Стоимость участия', places: 'мест', remaining: 'Осталось:', notice: 'Количество участников ограничено. После регистрации менеджер свяжется с вами для подтверждения участия.', date: 'Дата', time: 'Время', format: 'Формат', live: 'Живая встреча', name: 'Имя и фамилия', phone: 'Телефон', email: 'Email', participant: 'Тип участника', individual: 'Физическое лицо', company: 'Юридическое лицо', telegram: 'Telegram', consent: 'Отправляя заявку, вы принимаете условия обработки персональных данных и', privacy: 'политику конфиденциальности.', submit: 'ПОДТВЕРДИТЬ УЧАСТИЕ', sending: 'ОТПРАВКА...', error: 'Не удалось отправить заявку. Попробуйте ещё раз.' },
  en: { title: 'COMPLETE THE FORM TO RECEIVE ALL EVENT DETAILS PERSONALLY', priceLabel: 'Participation fee', places: 'seats', remaining: 'Remaining:', notice: 'The number of participants is limited. After registration, a manager will contact you to confirm your participation.', date: 'Date', time: 'Time', format: 'Format', live: 'In-person meeting', name: 'Full name', phone: 'Phone', email: 'Email', participant: 'Participant type', individual: 'Individual', company: 'Company', telegram: 'Telegram', consent: 'By submitting the form, you accept the processing of personal data and the', privacy: 'privacy policy.', submit: 'CONFIRM PARTICIPATION', sending: 'SENDING...', error: 'The request could not be sent. Please try again.' },
  uk: { title: 'ЗАПОВНІТЬ ФОРМУ, ЩОБ ОСОБИСТО ДІЗНАТИСЯ ВСІ ДЕТАЛІ ЗАХОДУ', priceLabel: 'Вартість участі', places: 'місць', remaining: 'Залишилось:', notice: 'Кількість учасників обмежена. Після реєстрації менеджер зв’яжеться з вами для підтвердження участі.', date: 'Дата', time: 'Час', format: 'Формат', live: 'Жива зустріч', name: 'Ім’я та прізвище', phone: 'Телефон', email: 'Email', participant: 'Тип учасника', individual: 'Фізична особа', company: 'Юридична особа', telegram: 'Telegram', consent: 'Надсилаючи заявку, ви приймаєте умови обробки персональних даних та', privacy: 'політику конфіденційності.', submit: 'ПІДТВЕРДИТИ УЧАСТЬ', sending: 'НАДСИЛАННЯ...', error: 'Не вдалося надіслати заявку. Спробуйте ще раз.' },
};

function formatRomanianPhone(value: string) {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('40')) digits = digits.slice(2);
  digits = digits.slice(0, 9);

  const first = digits.slice(0, 3);
  const second = digits.slice(3, 6);
  const third = digits.slice(6, 9);
  return `+40${first ? ` ${first}` : ''}${second ? ` ${second}` : ''}${third ? ` ${third}` : ''}`;
}

export function EventsPage() {
  const { lang } = useLanguage();
  const content = eventContent[lang];
  const audience = audienceContent[lang];
  const speaker = speakerContent[lang];
  const secondSpeaker = secondSpeakerContent[lang];
  const outcomes = outcomesContent[lang];
  const registration = registrationContent[lang];
  const [registrationForm, setRegistrationForm] = useState({ name: '', phone: '+40', email: '', participant: 'individual', telegram: '', consent: false });
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const checkoutHref = 'https://buy.stripe.com/test_7sYdR92C4f9Jf7FgS29AA00';

  const submitRegistration = async (event: React.FormEvent) => {
    event.preventDefault();
    setRegistrationStatus('sending');
    try {
      await sendToTelegram({
        name: registrationForm.name,
        phone: registrationForm.phone,
        email: registrationForm.email,
        entityType: registrationForm.participant === 'individual' ? registration.individual : registration.company,
        subject: 'Регистрация на практический семинар',
        message: `Telegram: ${registrationForm.telegram || '-'}\nДата: 23 июня 2026, 18:00\nСтоимость: 300 RON`,
        leadType: 'consultation',
      });
      window.location.assign(checkoutHref);
    } catch {
      setRegistrationStatus('error');
    }
  };

  return (
    <div className="events-page">
      <Header />
      <main className="events-main">
        <section className="event-hero" aria-labelledby="event-title">
          <div className="event-meta">
            <span><strong>23</strong> {content.month}</span>
            <span><strong>20</strong> {content.seats}</span>
            <span><strong>2026</strong></span>
          </div>

          <div className="event-hero-copy">
            <div className="event-location-row">
              <span><ArrowRight aria-hidden="true" /> {content.start}</span>
              <a href="https://www.google.com/maps/dir/?api=1&destination=Strada+Louis+Blanc+26,+Sector+1,+Bucharest,+Romania" target="_blank" rel="noreferrer">
                <ArrowRight aria-hidden="true" /> LOUIS BLANC, 26
              </a>
            </div>

            <div className="event-heading">
              <h1 id="event-title">{content.title}</h1>
              <div className="event-heading-line" />
              <p>{content.subtitle}</p>
            </div>

            <div className="event-desktop-actions">
              <div className="event-desktop-remaining" aria-label={`${content.total} 20 ${content.places}`}>
                <span>{content.total}:</span>
                <strong>20</strong>
                <span>{content.places}</span>
              </div>
              <a className="event-desktop-cta" href={checkoutHref}>
                <span>{content.cta}</span>
                <ArrowDown aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="event-poster">
            <div className="event-poster-copy event-poster-copy-left">
              <strong>{content.leftTitle}</strong>
              <span>{content.leftText}</span>
            </div>
            <div className="event-poster-copy event-poster-copy-right">
              <strong>{content.rightTitle}</strong>
              <span>{content.rightText}</span>
            </div>

            <div className="event-remaining" aria-label={`${content.total} 20 ${content.places}`}>
              <span>{content.total}</span>
              <strong>20</strong>
              <span>{content.places}</span>
            </div>

            <a
              className="event-cta"
              href={checkoutHref}
            >
              <span>{content.cta}</span>
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="event-audience" aria-labelledby="event-audience-title">
          <div className="event-audience-inner">
            <h2 id="event-audience-title">{audience.title}</h2>
            <div className="event-audience-grid">
              {audience.cards.map((card, index) => (
                <article className={`event-audience-card event-audience-card-${index + 1}`} key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="event-speaker" aria-labelledby="event-speaker-title">
          <div className="event-speaker-inner">
            <h2 id="event-speaker-title">{speaker.sectionTitle}</h2>
            <div className="event-speaker-divider" aria-hidden="true" />

            <div className="event-speaker-mobile-list event-speaker-mobile">
              {[
                { content: speaker, image: '/images/спикер.png' },
                { content: secondSpeaker, image: '/team/pantelei-event.jpg' },
              ].map((item) => (
                <article key={item.content.name}>
                  <div className="event-speaker-intro">
                    <div className="event-speaker-photo">
                      <img src={item.image} alt={item.content.name} />
                    </div>

                    <div className="event-speaker-person">
                      <h3>{item.content.name}</h3>
                      <p>{item.content.role}</p>

                      <ul className="event-speaker-credentials">
                        {item.content.credentials.map((credential) => (
                          <li key={credential}>{credential}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="event-speaker-details">
                    <div className="event-speaker-detail event-speaker-detail-wide">
                      <h3>{item.content.specializes}</h3>
                      <ul>
                        {item.content.specializations.map((specialization) => (
                          <li key={specialization}>{specialization}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="event-speaker-detail">
                      <h3>{item.content.believes}</h3>
                      <p>{item.content.belief}</p>
                    </div>

                    <div className="event-speaker-detail">
                      <h3>{item.content.work}</h3>
                      <p>{item.content.workText}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="event-speaker-desktop">
              {[
                { content: speaker, image: '/images/спикер.png' },
                { content: secondSpeaker, image: '/team/pantelei-event.jpg' },
              ].map((item, index) => (
                <article className={`event-speaker-profile event-speaker-profile-${index + 1}`} key={item.content.name}>
                  <div className="event-speaker-profile-photo">
                    <img src={item.image} alt={item.content.name} />
                    <ul className="event-speaker-profile-credentials">
                      {item.content.credentials.map(credential => <li key={credential}>{credential}</li>)}
                    </ul>
                  </div>
                  <div className="event-speaker-profile-copy">
                    <header>
                      <h3>{item.content.name}</h3>
                      <p>{item.content.role}</p>
                      {item.content.intro && <p className="event-speaker-profile-intro">{item.content.intro}</p>}
                      {item.content.background && <p className="event-speaker-profile-background">{item.content.background}</p>}
                    </header>
                    <div className="event-speaker-profile-specializes">
                      <h4>{item.content.specializes}</h4>
                      <ul>
                        {item.content.specializations.map(specialization => <li key={specialization}>{specialization}</li>)}
                      </ul>
                      {item.content.experience && <p className="event-speaker-profile-experience">{item.content.experience}</p>}
                    </div>
                    <div className="event-speaker-profile-notes">
                      <div>
                        <h4>{item.content.believes}</h4>
                        <p>{item.content.belief}</p>
                      </div>
                      <div>
                        <h4>{item.content.work}</h4>
                        <p>{item.content.workText}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <a
              className="event-speaker-cta event-speaker-mobile"
              href={checkoutHref}
            >
              <span>{speaker.cta}</span>
              <ArrowDown aria-hidden="true" />
            </a>
            <a className="event-speaker-desktop-cta" href={checkoutHref}>
              <span>{speaker.cta}</span>
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="event-outcomes" aria-labelledby="event-outcomes-title">
          <div className="event-outcomes-inner">
            <h2 id="event-outcomes-title">{outcomes.title}</h2>
            <div className="event-outcomes-list">
              {outcomes.cards.map((card, index) => (
                <div className="event-outcome-step" key={card.title}>
                  <article className={`event-outcome-card event-outcome-card-${index + 1}`}>
                    <h3>{card.title}</h3>
                    <span className="event-outcome-line" />
                    <p>{card.text}</p>
                  </article>
                  {index < outcomes.cards.length - 1 && (
                    <ArrowDown className="event-outcome-arrow" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="event-registration" aria-labelledby="event-registration-title">
          <div className="event-registration-inner">
            <div className="event-registration-heading">
              <h2 id="event-registration-title">
                {lang === 'ru'
                  ? <>ЗАПОЛНИТЕ ФОРМУ,<br /><em>ЧТОБЫ ЛИЧНО УЗНАТЬ</em><br />ВСЕ ДЕТАЛИ МЕРОПРИЯТИЯ</>
                  : registration.title}
              </h2>
              <p>{registration.priceLabel}</p>
              <span />
              <strong>300 RON</strong>
            </div>

            <form className="event-registration-card" onSubmit={submitRegistration}>
              <div className="event-registration-left">
                <div className="event-registration-image">
                  <div className="event-registration-remaining">
                    <span>{registration.remaining}</span><strong>20</strong><span>{registration.places}</span>
                  </div>
                </div>
                <p className="event-registration-notice">{registration.notice}</p>

                <dl className="event-registration-meta">
                  <div><dt>{registration.date}</dt><dd>23.06.2026</dd></div>
                  <div><dt>{registration.time}</dt><dd>18:00</dd></div>
                  <div><dt>{registration.format}</dt><dd>{registration.live}</dd></div>
                </dl>
              </div>
              <div className="event-registration-right">
              <div className="event-registration-price"><span>{registration.priceLabel}</span><strong>300 RON</strong></div>

              <div className="event-registration-fields">
                <label>{registration.name} *<input required aria-required="true" autoComplete="name" placeholder={registration.name} value={registrationForm.name} onChange={e => setRegistrationForm({ ...registrationForm, name: e.target.value })} /></label>
                <label>{registration.phone} *<input required aria-required="true" type="tel" inputMode="numeric" autoComplete="tel" pattern="^\+40 7\d{2} \d{3} \d{3}$" title="+40 7xx xxx xxx" value={registrationForm.phone} onFocus={e => { if (!e.currentTarget.value) setRegistrationForm({ ...registrationForm, phone: '+40' }); }} onChange={e => setRegistrationForm({ ...registrationForm, phone: formatRomanianPhone(e.target.value) })} /></label>
                <label>{registration.email} *<input required aria-required="true" type="email" autoComplete="email" placeholder="name@example.com" value={registrationForm.email} onChange={e => setRegistrationForm({ ...registrationForm, email: e.target.value })} /></label>
                <fieldset>
                  <legend>{registration.participant} *</legend>
                  <label><input required aria-required="true" type="radio" name="participant" checked={registrationForm.participant === 'individual'} onChange={() => setRegistrationForm({ ...registrationForm, participant: 'individual' })} />{registration.individual}</label>
                  <label><input required aria-required="true" type="radio" name="participant" checked={registrationForm.participant === 'company'} onChange={() => setRegistrationForm({ ...registrationForm, participant: 'company' })} />{registration.company}</label>
                </fieldset>
                <label>{registration.telegram}<input value={registrationForm.telegram} onChange={e => setRegistrationForm({ ...registrationForm, telegram: e.target.value })} /></label>
              </div>

              <label className="event-registration-consent">
                <input required aria-required="true" type="checkbox" checked={registrationForm.consent} onChange={e => setRegistrationForm({ ...registrationForm, consent: e.target.checked })} />
                <span><strong>*</strong> {registration.consent} <u>{registration.privacy}</u></span>
              </label>
              {registrationStatus === 'error' && <p className="event-registration-error">{registration.error}</p>}
              <button type="submit" disabled={registrationStatus === 'sending' || !registrationForm.consent}>{registrationStatus === 'sending' ? registration.sending : registration.submit}</button>
              </div>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
