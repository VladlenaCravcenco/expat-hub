import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Instagram, Linkedin, Calendar, Star } from 'lucide-react';

// Team member photos — Unsplash (works everywhere including Vercel)
const photo1 = 'https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGxhd3llciUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMTQ3NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080';
const photo2 = 'https://images.unsplash.com/photo-1720874129553-1d2e66076b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMG1hcmtldGluZyUyMG1hbmFnZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzMxNDIyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080';
const photo3 = 'https://images.unsplash.com/photo-1758518731009-66fc99eb20e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwcG9ydHJhaXQlMjBvZmZpY2V8ZW58MXx8fHwxNzczMTQwNDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080';

const team = [
  {
    name: 'Алёна Биволару',
    role: 'Переводчик',
    image: photo3,
    about: 'Профессиональный переводчик с румынского, молдавского и украинского языков. Специализируюсь на юридических и бизнес-документах, обеспечивая точность и конфиденциальность каждого проекта.',
    highlights: [
      { label: 'Опыт работы', value: '8+ лет' },
      { label: 'Переведено документов', value: '2500+' },
      { label: 'Языков', value: '4' },
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
        text: 'Спасибо огромное за оперативность! Перевела все документы за день, очень выру��ила с открытием компании в Румынии.',
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
    image: photo1,
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
        text: 'Профессионал своего дела! Помгла получить все разрешения для открытия магазина в Бухаресте. Рекомендую!',
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
    name: 'Алёна Руссу',
    role: 'Маркетинг',
    image: photo2,
    about: 'Маркетолог с фокусом на развитие бизнеса в новых рынках. Создаю стратегии продвижения ��ля компаний, которые расширяют деятельность в Румынии и Восточной Европе.',
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

// Компонент для карточки члена команды
function TeamMemberCard({ member, index, isInView }: { member: typeof team[0], index: number, isInView: boolean }) {
  const [activeTab, setActiveTab] = useState<'about' | 'reviews'>('about');

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2 + (index * 0.15), ease: [0.22, 1, 0.36, 1] }}
      className="lg:max-h-[70vh]"
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group h-full flex flex-col">
        {/* Photo */}
        <div className="relative overflow-hidden aspect-[4/5] flex-shrink-0">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a30]/60 via-transparent to-transparent" />
          
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
              className="text-[#e8742a] uppercase tracking-wider"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
              }}
            >
              {member.role}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col min-h-0">
          {/* Tabs Switcher */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-1.5 px-3 rounded-[16px] transition-all duration-300 ${
                activeTab === 'about' 
                  ? 'bg-[#e8742a] text-white' 
                  : 'text-[#6b7280] hover:text-[#0f1a30]'
              }`}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
              }}
            >
              Об опыте
            </button>
            
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-1.5 px-3 rounded-[16px] transition-all duration-300 ${
                activeTab === 'reviews' 
                  ? 'bg-[#e8742a] text-white' 
                  : 'text-[#6b7280] hover:text-[#0f1a30]'
              }`}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
              }}
            >
              Отзывы
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            {activeTab === 'about' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                {/* About */}
                <p 
                  className="text-[#6b7280] mb-4 leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                  }}
                >
                  {member.about}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  {member.highlights.map((highlight, i) => (
                    <div key={i} className="text-center">
                      <div 
                        className="text-[#e8742a] mb-0.5"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                        }}
                      >
                        {highlight.value}
                      </div>
                      <div 
                        className="text-[#6b7280]"
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
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full min-h-0"
              >
                {/* Google Rating */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e8742a]/10 flex-shrink-0">
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
                          <Star key={i} size={14} fill="#e8742a" color="#e8742a" />
                        ))}
                      </div>
                    </div>
                    <p 
                      className="text-[#6b7280]"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.65rem',
                      }}
                    >
                      {member.reviewsCount} отзывов
                    </p>
                  </div>
                  <a
                    href={member.googleReviews}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-full bg-[#faf8f5] text-[#0f1a30] hover:bg-[#e8742a] hover:text-white transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.65rem',
                      fontWeight: 500,
                    }}
                  >
                    Google
                  </a>
                </div>

                {/* Reviews List */}
                <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
                  {member.reviews.map((review, i) => (
                    <div key={i} className="pb-3 border-b border-[#e8742a]/5 last:border-0">
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
                            <Star key={i} size={9} fill="#e8742a" color="#e8742a" />
                          ))}
                        </div>
                      </div>
                      <p 
                        className="text-[#6b7280] mb-1.5 leading-relaxed"
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.7rem',
                        }}
                      >
                        {review.text}
                      </p>
                      <p 
                        className="text-[#6b7280]"
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
          <div className="h-px bg-gradient-to-r from-transparent via-[#e8742a]/20 to-transparent my-4 flex-shrink-0" />

          {/* Social & CTA */}
          <div className="flex items-center justify-between gap-4 flex-shrink-0">
            {/* Socials */}
            <div className="flex gap-2">
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#faf8f5] flex items-center justify-center text-[#0f1a30] hover:bg-[#e8742a] hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#faf8f5] flex items-center justify-center text-[#0f1a30] hover:bg-[#e8742a] hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
            </div>

            {/* Consultation CTA */}
            <a
              href={member.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e8742a] text-white hover:bg-[#d66820] transition-all duration-300 group/btn"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 500,
              }}
            >
              <Calendar size={12} />
              <span className="hidden sm:inline">Консультация</span>
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

  return (
    <section id="team" className="py-20 sm:py-28 md:py-32 bg-[#faf8f5] overflow-hidden relative" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Section header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div 
              className="uppercase tracking-wider text-[#e8742a] mb-6"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
              }}
            >
              Команда
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#0f1a30',
              }}
            >
              Познакомьтесь с нашей командо
            </h2>
            <p 
              className="text-[#6b7280] max-w-2xl mx-auto"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
              }}
            >
              Профессионалы, которые помогут вам на каждом этапе развития бизнеса в Румынии
            </p>
          </motion.div>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {team.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}