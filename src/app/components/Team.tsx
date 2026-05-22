import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Instagram, Linkedin, Calendar, Star } from 'lucide-react';

const photo1 = '/team/aliona-1.jpg';
const photo2 = '/team/Aliona-2.jpg';
const photo3 = '/team/aliona-3.jpg';

const team = [
  {
    name: 'Алёна Биволару',
    role: 'Переводчик',
    image: photo1,
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
    image: photo3,
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
              Об опыте
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
              Отзывы
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
                        {member.reviewsCount} отзывов
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
              Познакомьтесь с нашей командой
            </h2>
            <p 
              className="text-[#64748b] max-w-xl"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                lineHeight: 1.7,
              }}
            >
              Профессионалы, которые помогут вам на каждом этапе развития бизнеса в Румынии
            </p>
          </motion.div>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {team.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
