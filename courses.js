// The 21 courses of the Exam Prep Hub. Each opens its live hub page in-app,
// so the twice-daily content refreshes flow with no app update needed.
export const HUB_BASE = 'https://maticcretic-commits.github.io/exam-prep-hub/';

export const COURSES = [
  { id: 'upsc',          title: 'UPSC CSE',              file: 'upsc.html',            tagline: 'IAS/IPS/IFS 2027 — Prelims, Mains & Interview',        stats: '2027 cycle · 21-book list',      accent: '#6366F1' },
  { id: 'neet',          title: 'NEET UG',               file: 'neet.html',            tagline: 'MBBS/BDS — Physics, Chemistry, Biology',               stats: 'PCB · NCERT-first plan',         accent: '#10B981' },
  { id: 'bpsc',          title: 'BPSC',                  file: 'bpsc.html',            tagline: 'Bihar PCS — Bihar GK + practice bank',                stats: '1,053 MCQs · 699 capsules',      accent: '#F59E0B' },
  { id: 'jee',           title: 'JEE Main + Advanced',   file: 'jee.html',             tagline: 'Physics, Chemistry, Maths',                           stats: 'Main + Advanced · PYQ trends',   accent: '#EF4444' },
  { id: 'law',           title: 'Law Entrance',          file: 'law.html',             tagline: 'CLAT & AILET 2027',                                   stats: '2027 cycle · 5 sections',        accent: '#8B5CF6' },
  { id: 'tech',          title: 'Software / AI / Tech',  file: 'tech.html',            tagline: 'Coding, AI/ML, cloud, cybersecurity roadmaps',          stats: 'Roadmaps · AI/ML track',         accent: '#06B6D4' },
  { id: 'ca',            title: 'CA',                    file: 'ca.html',              tagline: 'Foundation, Intermediate & Final',                    stats: '3 levels · ICAI resources',      accent: '#84CC16' },
  { id: 'ssc',           title: 'SSC',                   file: 'ssc.html',             tagline: 'CGL, CHSL, MTS, GD Constable',                        stats: '4 exams · Tier-wise plan',       accent: '#F97316' },
  { id: 'banking',       title: 'Banking',               file: 'banking.html',         tagline: 'IBPS, SBI, RBI',                                        stats: 'Quant + Reasoning',             accent: '#14B8A6' },
  { id: 'railways',      title: 'Railways',              file: 'railways.html',        tagline: 'RRB NTPC, Group D, ALP',                               stats: 'NTPC · Group D · Technician',   accent: '#0EA5E9' },
  { id: 'teaching',      title: 'Teaching',              file: 'teaching.html',        tagline: 'CTET & BPSC TRE',                                       stats: 'CTET papers · BPSC TRE',        accent: '#EC4899' },
  { id: 'defence',       title: 'Defence',               file: 'defence.html',         tagline: 'NDA, CDS, AFCAT, Agniveer',                            stats: 'NDA · CDS · AFCAT',             accent: '#64748B' },
  { id: 'current-affairs', title: 'Current Affairs',     file: 'current-affairs.html', tagline: 'Daily current affairs for all exams',                 stats: 'Daily updates',                 accent: '#EAB308' },
  { id: 'sarkari',       title: 'Sarkari Vacancies',     file: 'sarkari.html',         tagline: 'Government job listings from official sources',         stats: '63 official sources',           accent: '#22C55E' },
  { id: 'banking-certs', title: 'Banking Certifications', file: 'banking-certs.html',  tagline: 'JAIIB, CAIIB, CISB, DBF, AML/KYC',                     stats: '1,950 MCQs · 46 chapters',      accent: '#A855F7' },
  { id: 'toefl',         title: 'TOEFL',                 file: 'toefl.html',           tagline: 'Study-abroad English test prep',                      stats: '12 chapters · 503 MCQs',        accent: '#3B82F6' },
  { id: 'ielts',         title: 'IELTS',                 file: 'ielts.html',           tagline: 'Study-abroad English test prep',                      stats: '12 chapters · 450 MCQs',        accent: '#0D9488' },
  { id: 'gre',           title: 'GRE',                   file: 'gre.html',             tagline: 'Graduate Record Examination prep',                    stats: 'Chapters · MCQs · capsules',    accent: '#D946EF' },
  { id: 'gmat',          title: 'GMAT',                  file: 'gmat.html',            tagline: 'Graduate Management Admission Test prep',             stats: 'Chapters · MCQs · capsules',    accent: '#F43F5E' },
  { id: 'sat',           title: 'SAT',                   file: 'sat.html',             tagline: 'Scholastic Assessment Test prep',                     stats: 'Chapters · MCQs · capsules',    accent: '#8B5CF6' },
  { id: 'pte',           title: 'PTE',                   file: 'pte.html',             tagline: 'Pearson Test of English prep',                        stats: 'Chapters · MCQs · capsules',    accent: '#10B981' },
];
