import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useMemo, useRef, useState } from 'react';
import { Instagram, Linkedin, Calendar, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const photo1 = '/team/aliona-1.jpg';
const photo2 = '/team/Aliona-2.jpg';
const photo3 = '/team/aliona-3.jpg';

const firstMemberContent = {
  ro: {
    name: 'Aliona Bivolaru',
    role: 'Traducător',
    about:
      'Traducător profesionist și coordonator al echipei de traducători autorizați a companiei VerbaTranslations. Specializată în traducerea documentelor, legalizare și coordonarea proiectelor internaționale, ajutând clienții să pregătească rapid și corect documentele pentru studii, afaceri și proceduri de migrație.',
    highlights: [
      { label: 'Experiență profesională', value: '15+ ani' },
      { label: 'Documente traduse', value: '20000+' },
      { label: 'Direcții lingvistice', value: '4+' },
    ],
  },
  ru: {
    name: 'Алёна Биволару',
    role: 'Переводчик',
    about:
      'Профессиональный переводчик и координатор команды авторизованных переводчиков компании VerbaTranslations. Специализируется на переводах документов, легализации и сопровождении международных проектов, помогая клиентам быстро и правильно подготовить документы для обучения, бизнеса и миграционных процедур.',
    highlights: [
      { label: 'Опыт работы', value: '15+ лет' },
      { label: 'Переведено документов', value: '20000+' },
      { label: 'Языковых направлений', value: '4+' },
    ],
  },
  en: {
    name: 'Aliona Bivolaru',
    role: 'Translator',
    about:
      'Professional translator and coordinator of VerbaTranslations authorized translators team. Specialises in document translation, legalisation, and support for international projects, helping clients quickly and accurately prepare documents for education, business, and migration procedures.',
    highlights: [
      { label: 'Work experience', value: '15+ years' },
      { label: 'Documents translated', value: '20000+' },
      { label: 'Language pairs', value: '4+' },
    ],
  },
  uk: {
    name: 'Альона Біволару',
    role: 'Перекладач',
    about:
      'Професійний перекладач і координатор команди авторизованих перекладачів компанії VerbaTranslations. Спеціалізується на перекладі документів, легалізації та супроводі міжнародних проєктів, допомагаючи клієнтам швидко й правильно підготувати документи для навчання, бізнесу та міграційних процедур.',
    highlights: [
      { label: 'Досвід роботи', value: '15+ років' },
      { label: 'Перекладено документів', value: '20000+' },
      { label: 'Мовних напрямів', value: '4+' },
    ],
  },
} as const;

const secondMemberContent = {
  ro: {
    name: 'Aliona Pantelei',
    role: 'Jurist',
    about:
      'Jurist român cu peste 11 ani de experiență în drept corporativ, asistență juridică pentru business și procese migraționale. Oferă suport juridic complet clienților străini și companiilor românești, ajutând la deschiderea afacerii, înregistrarea documentelor, obținerea autorizațiilor și asistență în toate etapele activității în România.',
    highlights: [
      { label: 'Experiență profesională', value: '11+ ani' },
      { label: 'Proiecte juridice', value: '500+' },
      { label: 'Asistență completă', value: '100%' },
    ],
  },
  ru: {
    name: 'Алёна Пантелей',
    role: 'Юрист',
    about:
      'Румынский юрист с более чем 11-летним опытом работы в сфере корпоративного права, юридического сопровождения бизнеса и миграционных процессов. Оказывает комплексную юридическую поддержку иностранным клиентам и румынским компаниям, помогая с открытием бизнеса, регистрацией документов, разрешениями и сопровождением на всех этапах деятельности в Румынии.',
    highlights: [
      { label: 'Опыт работы', value: '11+ лет' },
      { label: 'Юридических проектов', value: '500+' },
      { label: 'Комплексное сопровождение', value: '100%' },
    ],
  },
  en: {
    name: 'Aliona Pantelei',
    role: 'Lawyer',
    about:
      'Romanian lawyer with more than 11 years of experience in corporate law, legal support for businesses, and migration processes. Provides comprehensive legal assistance to foreign clients and Romanian companies, helping with business launch, document registration, permits, and support at every stage of operations in Romania.',
    highlights: [
      { label: 'Work experience', value: '11+ years' },
      { label: 'Legal projects', value: '500+' },
      { label: 'Full support', value: '100%' },
    ],
  },
  uk: {
    name: 'Альона Пантелей',
    role: 'Юрист',
    about:
      'Румунський юрист з більш ніж 11-річним досвідом у сфері корпоративного права, юридичного супроводу бізнесу та міграційних процесів. Надає комплексну юридичну підтримку іноземним клієнтам і румунським компаніям, допомагаючи з відкриттям бізнесу, реєстрацією документів, дозволами та супроводом на всіх етапах діяльності в Румунії.',
    highlights: [
      { label: 'Досвід роботи', value: '11+ років' },
      { label: 'Юридичних проєктів', value: '500+' },
      { label: 'Комплексний супровід', value: '100%' },
    ],
  },
} as const;

const thirdMemberContent = {
  ro: {
    name: 'Aliona Rusu',
    role: 'Marketing',
    about:
      'Specialistă în marketing cu focus pe dezvoltarea afacerilor pe piețe noi. Creează strategii de promovare pentru companiile care își extind activitatea în România și Europa de Est.',
    highlights: [
      { label: 'Experiență profesională', value: '7+ ani' },
      { label: 'Proiecte realizate', value: '90+' },
      { label: 'ROI mediu', value: '240%' },
    ],
    reviews: [
      {
        author: 'Victoria N.',
        rating: 5,
        text: 'A dezvoltat o strategie de marketing excelentă pentru afacerea noastră IT din România. Rezultatele au depășit așteptările!',
        date: 'acum 2 săptămâni',
      },
      {
        author: 'Maxim R.',
        rating: 5,
        text: 'Ne-a ajutat să lansăm produsul pe piața românească. Abordare profesionistă, analiză profundă și rezultate reale.',
        date: 'acum 1 lună',
      },
      {
        author: 'Olga K.',
        rating: 5,
        text: 'Datorită strategiei create de Aliona, ne-am crescut vânzările de 3 ori în șase luni. O recomand cu încredere!',
        date: 'acum 2 luni',
      },
    ],
  },
  ru: {
    name: 'Алёна Русу',
    role: 'Маркетинг',
    about:
      'Маркетолог с фокусом на развитие бизнеса в новых рынках. Создаю стратегии продвижения для компаний, которые расширяют деятельность в Румынии и Восточной Европе.',
    highlights: [
      { label: 'Опыт работы', value: '7+ лет' },
      { label: 'Проектов реализовано', value: '90+' },
      { label: 'Средний ROI', value: '240%' },
    ],
    reviews: [
      {
        author: 'Виктория Н.',
        rating: 5,
        text: 'Разработала отличную маркетинговую стратегию для нашего IT-бизнеса в Румынии. Результаты превзошли ожидания!',
        date: '2 недели назад',
      },
      {
        author: 'Максим Р.',
        rating: 5,
        text: 'Помогла вывести продукт на румынский рынок. Профессиональный подход, глубокий анализ, реальные результаты.',
        date: '1 месяц назад',
      },
      {
        author: 'Ольга К.',
        rating: 5,
        text: 'Благодаря стратегии от Алёны мы увеличили продажи в 3 раза за полгода. Очень рекомендую!',
        date: '2 месяца назад',
      },
    ],
  },
  en: {
    name: 'Aliona Rusu',
    role: 'Marketing',
    about:
      'Marketing specialist focused on business growth in new markets. Builds promotion strategies for companies expanding their operations in Romania and Eastern Europe.',
    highlights: [
      { label: 'Work experience', value: '7+ years' },
      { label: 'Projects delivered', value: '90+' },
      { label: 'Average ROI', value: '240%' },
    ],
    reviews: [
      {
        author: 'Victoria N.',
        rating: 5,
        text: 'She developed an excellent marketing strategy for our IT business in Romania. The results exceeded expectations!',
        date: '2 weeks ago',
      },
      {
        author: 'Maxim R.',
        rating: 5,
        text: 'She helped us bring the product to the Romanian market. Professional approach, deep analysis, and real results.',
        date: '1 month ago',
      },
      {
        author: 'Olga K.',
        rating: 5,
        text: 'Thanks to Aliona’s strategy, we increased sales threefold in six months. Highly recommended!',
        date: '2 months ago',
      },
    ],
  },
  uk: {
    name: 'Альона Русу',
    role: 'Маркетинг',
    about:
      'Маркетолог із фокусом на розвиток бізнесу на нових ринках. Створює стратегії просування для компаній, які розширюють діяльність у Румунії та Східній Європі.',
    highlights: [
      { label: 'Досвід роботи', value: '7+ років' },
      { label: 'Проєктів реалізовано', value: '90+' },
      { label: 'Середній ROI', value: '240%' },
    ],
    reviews: [
      {
        author: 'Вікторія Н.',
        rating: 5,
        text: 'Розробила чудову маркетингову стратегію для нашого IT-бізнесу в Румунії. Результати перевершили очікування!',
        date: '2 тижні тому',
      },
      {
        author: 'Максим Р.',
        rating: 5,
        text: 'Допомогла вивести продукт на румунський ринок. Професійний підхід, глибокий аналіз і реальні результати.',
        date: '1 місяць тому',
      },
      {
        author: 'Ольга К.',
        rating: 5,
        text: 'Завдяки стратегії від Альони ми збільшили продажі втричі за пів року. Дуже рекомендую!',
        date: '2 місяці тому',
      },
    ],
  },
} as const;

const teamUiContent = {
  ro: {
    aboutTab: 'Despre experiență',
    reviewsTab: 'Recenzii',
    reviewsLabel: 'recenzii',
    consultation: 'Consultație',
    title: 'Faceți cunoștință cu echipa noastră',
    description: 'Profesioniști care vă ajută la fiecare etapă de dezvoltare a afacerii în România',
  },
  ru: {
    aboutTab: 'Об опыте',
    reviewsTab: 'Отзывы',
    reviewsLabel: 'отзывов',
    consultation: 'Консультация',
    title: 'Познакомьтесь с нашей командой',
    description: 'Профессионалы, которые помогут вам на каждом этапе развития бизнеса в Румынии',
  },
  en: {
    aboutTab: 'Experience',
    reviewsTab: 'Reviews',
    reviewsLabel: 'reviews',
    consultation: 'Consultation',
    title: 'Meet our team',
    description: 'Professionals who help you at every stage of growing your business in Romania',
  },
  uk: {
    aboutTab: 'Про досвід',
    reviewsTab: 'Відгуки',
    reviewsLabel: 'відгуків',
    consultation: 'Консультація',
    title: 'Познайомтеся з нашою командою',
    description: 'Професіонали, які допоможуть вам на кожному етапі розвитку бізнесу в Румунії',
  },
} as const;

const team = [
  {
    name: 'Алёна Биволару',
    role: 'Переводчик',
    image: photo1,
    about: 'Профессиональный переводчик с румынского, молдавского и украинского языков. Специализируюсь на юридических и бизнес-документах, обеспечивая точность и конфиденциальность каждого проекта.',
    highlights: [
      { label: 'Опыт работы', value: '15+ лет' },
      { label: 'Переведено документов', value: '20000+' },
      { label: 'Языков', value: '4+' },
    ],
    socials: {
      instagram: '#', // TODO: Добавить реальную ссылку
      linkedin: '#', // TODO: Добавить реальную ссылку
    },
    calendly: '#', // TODO: Добавить ссылку на Google Calendar
    googleReviews: '#', // TODO: Добавить ссылку на Google профиль
    rating: 5.0,
    reviewsCount: 47,
    reviews: [
      {
        author: 'Дмитрий К.',
        rating: 5,
        text: 'Профессиональный подход к переводу документов. Все сделано быстро и качественно, помогла с легализацией всех бумаг для бизнеса.',
        date: '2 недели назад',
      },
      {
        author: 'Елена М.',
        rating: 5,
        text: 'Спасибо огромное за оперативность! Перевела все документы за день, очень выручила с открытием компании в Румынии.',
        date: '1 месяц назад',
      },
      {
        author: 'Игорь С.',
        rating: 5,
        text: 'Отличная работа! Рекомендую всем, кто переезжает в Румынию и нужен качественный перевод юридических документов.',
        date: '2 месяца назад',
      },
    ],
  },
  {
    name: 'Алёна Пантелей',
    role: 'Легализация',
    image: photo2,
    about: 'Эксперт по легализации бизнеса и регистрации компаний в Румынии. Помогаю украинским предпринимателям с получением всех необходимых разрешений и документов для ведения бизнеса.',
    highlights: [
      { label: 'Опыт работы', value: '6+ лет' },
      { label: 'Компаний зарегистрировано', value: '150+' },
      { label: 'Успешность', value: '100%' },
    ],
    socials: {
      instagram: '#', // TODO: Добавить реальную ссылку
      linkedin: '#', // TODO: Добавить реальную ссылку
    },
    calendly: '#', // TODO: Добавить ссылку на Google Calendar
    googleReviews: '#', // TODO: Добавить ссылку на Google профиль
    rating: 5.0,
    reviewsCount: 62,
    reviews: [
      {
        author: 'Андрей В.',
        rating: 5,
        text: 'Зарегистрировали компанию за неделю! Алёна провела через все этапы, объяснила каждую деталь. Очень благодарен за поддержку.',
        date: '1 неделя назад',
      },
      {
        author: 'Мария П.',
        rating: 5,
        text: 'Профессионал своего дела! Помогла получить все разрешения для открытия магазина в Бухаресте. Рекомендую!',
        date: '3 недели назад',
      },
      {
        author: 'Сергей Л.',
        rating: 5,
        text: 'Легализация бизнеса прошла без единой проблемы благодаря Алёне. Четко, быстро, профессионально!',
        date: '1 месяц назад',
      },
    ],
  },
  {
    name: 'Алёна Русу',
    role: 'Маркетинг',
    image: photo3,
    about: 'Маркетолог с фокусом на развитие бизнеса в новых рынках. Создаю стратегии продвижения для компаний, которые расширяют деятельность в Румынии и Восточной Европе.',
    highlights: [
      { label: 'Опыт работы', value: '7+ лет' },
      { label: 'Проектов реализовано', value: '90+' },
      { label: 'Средний ROI', value: '240%' },
    ],
    socials: {
      instagram: '#', // TODO: Добавить реальную ссылку
      linkedin: '#', // TODO: Добавить реальную ссылку
    },
    calendly: '#', // TODO: Добавить ссылку на Google Calendar
    googleReviews: '#', // TODO: Добавить ссылку на Google профиль
    rating: 5.0,
    reviewsCount: 38,
    reviews: [
      {
        author: 'Виктория Н.',
        rating: 5,
        text: 'Разработала отличную маркетинговую стратегию для нашего IT-бизнеса в Румынии. Результаты превзошли ожидания!',
        date: '2 недели назад',
      },
      {
        author: 'Максим Р.',
        rating: 5,
        text: 'Помогла вывести продукт на румынский рынок. Профессиональный подход, глубокий анализ, реальные результаты.',
        date: '1 месяц назад',
      },
      {
        author: 'Ольга К.',
        rating: 5,
        text: 'Благодаря стратегии от Алёны мы увеличили продажи в 3 раза за полгода. Очень рекомендую!',
        date: '2 месяца назад',
      },
    ],
  },
];

function TeamMemberCard({
  member,
  index,
  isInView,
  ui,
}: {
  member: typeof team[0],
  index: number,
  isInView: boolean,
  ui: typeof teamUiContent.ru,
}) {
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2 + (index * 0.15), ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-white rounded-[14px] overflow-hidden border border-[#dde5f8] shadow-sm hover:shadow-lg transition-all duration-500 group h-full flex flex-col">
        {/* Photo */}
        <div className="relative overflow-hidden aspect-[4/5] flex-shrink-0">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-[#0f172a]/10 to-transparent" />
          
          {/* Name & Role on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3
              className="text-white mb-0.5"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
              }}
            >
              {member.name}
            </h3>
            <p 
              className="text-[#cfe0ff] uppercase tracking-wider"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
              }}
            >
              {member.role}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-2 px-3 rounded-[10px] border transition-all duration-300 ${
                activeTab === 'about'
                  ? 'bg-[#2F71BE] text-white border-[#2F71BE]'
                  : 'bg-[#f8fbff] text-[#64748b] border-[#dde5f8] hover:text-[#0f172a] hover:border-[#bfd1f3]'
              }`}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.825rem',
                fontWeight: 600,
              }}
            >
              {ui.aboutTab}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-2 px-3 rounded-[10px] border transition-all duration-300 ${
                activeTab === 'reviews'
                  ? 'bg-[#2F71BE] text-white border-[#2F71BE]'
                  : 'bg-[#f8fbff] text-[#64748b] border-[#dde5f8] hover:text-[#0f172a] hover:border-[#bfd1f3]'
              }`}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.825rem',
                fontWeight: 600,
              }}
            >
              {ui.reviewsTab}
            </button>
          </div>

          <div className="flex-1">
            {activeTab === 'about' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                <p
                  className="text-[#475569] leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                  }}
                >
                  {member.about}
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {member.highlights.map((highlight, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="text-[#2F71BE] mb-0.5"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                        }}
                      >
                        {highlight.value}
                      </div>
                      <div
                        className="text-[#64748b]"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.6rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {highlight.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-4"
              >
                <div className="pb-3 border-b border-[#dde5f8]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <div
                          className="text-[#0f1a30]"
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.5rem',
                            fontWeight: 600,
                          }}
                        >
                          {member.rating.toFixed(1)}
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="#2F71BE" color="#2F71BE" />
                          ))}
                        </div>
                      </div>
                      <p
                        className="text-[#64748b]"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.65rem',
                        }}
                      >
                        {member.reviewsCount} {ui.reviewsLabel}
                      </p>
                    </div>
                    <a
                      href={member.googleReviews}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-[8px] border border-[#dde5f8] bg-[#f8fbff] text-[#2F71BE] hover:bg-[#2F71BE] hover:text-white hover:border-[#2F71BE] transition-all duration-300"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.65rem',
                        fontWeight: 500,
                      }}
                    >
                      Google
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  {member.reviews.map((review, i) => (
                    <div key={i} className="pb-3 border-b border-[#eef3fc] last:border-0">
                      <div className="flex items-start justify-between mb-1.5">
                        <p
                          className="text-[#0f1a30]"
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        >
                          {review.author}
                        </p>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={9} fill="#2F71BE" color="#2F71BE" />
                          ))}
                        </div>
                      </div>
                      <p
                        className="text-[#475569] mb-1.5 leading-relaxed"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.7rem',
                        }}
                      >
                        {review.text}
                      </p>
                      <p
                        className="text-[#64748b]"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.6rem',
                        }}
                      >
                        {review.date}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#d7e4fa] to-transparent my-4 flex-shrink-0" />

          {/* Social & CTA */}
          <div className="flex items-center justify-between gap-4 flex-shrink-0">
            {/* Socials */}
            <div className="flex gap-2">
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[10px] border border-[#dde5f8] bg-[#f8fbff] flex items-center justify-center text-[#2F71BE] hover:bg-[#2F71BE] hover:text-white hover:border-[#2F71BE] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[10px] border border-[#dde5f8] bg-[#f8fbff] flex items-center justify-center text-[#2F71BE] hover:bg-[#2F71BE] hover:text-white hover:border-[#2F71BE] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
            </div>

            {/* Consultation CTA */}
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] bg-[#2F71BE] text-white hover:bg-[#255d9f] transition-all duration-300 group/btn"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 500,
              }}
            >
              <Calendar size={12} />
              <span className="hidden sm:inline">{ui.consultation}</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { lang } = useLanguage();
  const ui = teamUiContent[lang];
  const localizedTeam = useMemo(() => {
    const firstMember = firstMemberContent[lang];
    const secondMember = secondMemberContent[lang];
    const thirdMember = thirdMemberContent[lang];

    return team.map((member, index) =>
      index === 0
        ? {
            ...member,
            name: firstMember.name,
            role: firstMember.role,
            about: firstMember.about,
            highlights: firstMember.highlights,
          }
        : index === 1
          ? {
              ...member,
              name: secondMember.name,
              role: secondMember.role,
              about: secondMember.about,
              highlights: secondMember.highlights,
            }
          : index === 2
            ? {
                ...member,
                name: thirdMember.name,
                role: thirdMember.role,
                about: thirdMember.about,
                highlights: thirdMember.highlights,
                reviews: thirdMember.reviews,
              }
            : member
    );
  }, [lang]);

  return (
    <section id="team" className="py-20 sm:py-28 md:py-32 bg-white overflow-hidden relative" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="mb-4"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#0f172a',
                letterSpacing: '-0.02em',
              }}
            >
              {ui.title}
            </h2>
            <p 
              className="text-[#64748b] max-w-xl"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                lineHeight: 1.7,
              }}
            >
              {ui.description}
            </p>
          </motion.div>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {localizedTeam.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} isInView={isInView} ui={ui} />
          ))}
        </div>
      </div>
    </section>
  );
}
