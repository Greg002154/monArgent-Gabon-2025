
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EducationPage() {
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [showAllTerms, setShowAllTerms] = useState(false);
  const [selectedArticleCategory, setSelectedArticleCategory] = useState('integrity');
  const [showLessonDetail, setShowLessonDetail] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showArticleDetail, setShowArticleDetail] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([1, 2]);

  const categories = [
    { id: 'basics', name: 'Les bases', icon: 'ri-book-line' },
    { id: 'savings', name: 'Épargne', icon: 'ri-piggy-bank-line' },
    { id: 'investment', name: 'Investissement', icon: 'ri-line-chart-line' },
    { id: 'budgeting', name: 'Budget', icon: 'ri-pie-chart-line' }
  ];

  const articleCategories = [
    { id: 'integrity', name: 'Intégrité', icon: 'ri-shield-check-line' },
    { id: 'corruption', name: 'Anti-corruption', icon: 'ri-forbid-line' },
    { id: 'ethics', name: 'Éthique financière', icon: 'ri-scales-line' },
    { id: 'family', name: 'Gestion familiale', icon: 'ri-home-heart-line' }
  ];

  const lessons = {
    basics: [
      {
        id: 1,
        title: 'Qu\'est-ce que l\'argent ?',
        description: 'Comprendre la valeur et l\'utilité de l\'argent dans notre société',
        duration: '5 min',
        difficulty: 'Débutant',
        completed: true,
        content: {
          introduction: 'L\'argent est un moyen d\'échange qui facilite les transactions commerciales...',
          keyPoints: [
            'L\'argent représente une valeur reconnue par la société',
            'Il facilite les échanges commerciaux',
            'Il peut être conservé pour des achats futurs',
            'Sa valeur peut fluctuer selon l\'économie'
          ],
          quiz: [
            {
              question: 'Quelle est la fonction principale de l\'argent ?',
              options: ['Décorer', 'Faciliter les échanges', 'Faire du bruit', 'Occuper l\'espace'],
              correct: 1
            }
          ]
        }
      },
      {
        id: 2,
        title: 'Revenus vs Dépenses',
        description: 'Apprendre à distinguer ce qui rentre et ce qui sort',
        duration: '8 min',
        difficulty: 'Débutant',
        completed: true,
        content: {
          introduction: 'Gérer ses finances commence par comprendre la différence entre revenus et dépenses...',
          keyPoints: [
            'Les revenus sont l\'argent qui rentre (salaire, ventes, etc.)',
            'Les dépenses sont l\'argent qui sort (achats, factures, etc.)',
            'L\'équilibre est essentiel pour une bonne santé financière',
            'Il faut toujours dépenser moins que ce qu\'on gagne'
          ],
          quiz: [
            {
              question: 'Votre salaire mensuel est considéré comme :',
              options: ['Une dépense', 'Un revenu', 'Une dette', 'Un investissement'],
              correct: 1
            }
          ]
        }
      },
      {
        id: 3,
        title: 'Les différents types de dépenses',
        description: 'Besoins, envies et dépenses d\'urgence',
        duration: '10 min',
        difficulty: 'Débutant',
        completed: false,
        content: {
          introduction: 'Toutes les dépenses ne se valent pas. Il est crucial de les catégoriser...',
          keyPoints: [
            'Besoins essentiels : nourriture, logement, santé',
            'Envies : loisirs, gadgets, vêtements de mode',
            'Urgences : réparations, frais médicaux imprévus',
            'Prioriser les besoins avant les envies'
          ],
          quiz: [
            {
              question: 'Acheter un nouveau téléphone alors que le vôtre fonctionne est :',
              options: ['Un besoin essentiel', 'Une envie', 'Une urgence', 'Un investissement'],
              correct: 1
            }
          ]
        }
      }
    ],
    savings: [
      {
        id: 4,
        title: 'Pourquoi épargner ?',
        description: 'L\'importance de mettre de l\'argent de côté',
        duration: '6 min',
        difficulty: 'Débutant',
        completed: false,
        content: {
          introduction: 'L\'épargne est la base de la sécurité financière...',
          keyPoints: [
            'Protection contre les imprévus',
            'Réalisation de projets futurs',
            'Tranquillité d\'esprit',
            'Possibilité d\'investir plus tard'
          ],
          quiz: [
            {
              question: 'Quel pourcentage minimum de vos revenus devriez-vous épargner ?',
              options: ['5%', '10%', '20%', '50%'],
              correct: 1
            }
          ]
        }
      },
      {
        id: 5,
        title: 'La règle des 50/30/20',
        description: 'Comment répartir ses revenus efficacement',
        duration: '12 min',
        difficulty: 'Intermédiaire',
        completed: false,
        content: {
          introduction: 'Cette règle simple vous aide à équilibrer vos finances...',
          keyPoints: [
            '50% pour les besoins essentiels',
            '30% pour les envies et loisirs',
            '20% pour l\'épargne et les dettes',
            'Adaptable selon votre situation'
          ],
          quiz: [
            {
              question: 'Selon la règle 50/30/20, sur un salaire de 100 000 FCFA, combien devez-vous épargner ?',
              options: ['10 000 FCFA', '20 000 FCFA', '30 000 FCFA', '50 000 FCFA'],
              correct: 1
            }
          ]
        }
      }
    ],
    investment: [
      {
        id: 6,
        title: 'Introduction aux investissements',
        description: 'Faire travailler son argent pour soi',
        duration: '15 min',
        difficulty: 'Avancé',
        completed: false,
        content: {
          introduction: 'Investir permet de faire croître votre patrimoine...',
          keyPoints: [
            'L\'investissement fait croître votre argent',
            'Diversification pour réduire les risques',
            'Patience et vision à long terme',
            'Commencer petit et apprendre'
          ],
          quiz: [
            {
              question: 'Quel est le principe de base de l\'investissement ?',
              options: ['Dépenser rapidement', 'Faire travailler son argent', 'Garder tout en liquide', 'Emprunter plus'],
              correct: 1
            }
          ]
        }
      }
    ],
    budgeting: [
      {
        id: 7,
        title: 'Créer son premier budget',
        description: 'Planifier ses dépenses mensuelles',
        duration: '10 min',
        difficulty: 'Débutant',
        completed: false,
        content: {
          introduction: 'Un budget vous donne le contrôle sur vos finances...',
          keyPoints: [
            'Lister tous vos revenus',
            'Identifier toutes vos dépenses',
            'Catégoriser et prioriser',
            'Ajuster et suivre régulièrement'
          ],
          quiz: [
            {
              question: 'La première étape pour créer un budget est :',
              options: ['Acheter un logiciel', 'Lister ses revenus', 'Couper les dépenses', 'Emprunter de l\'argent'],
              correct: 1
            }
          ]
        }
      }
    ]
  };

  const financialTerms = [
    {
      term: 'Budget',
      definition: 'Plan qui montre combien d\'argent vous gagnez et dépensez sur une période donnée.',
      icon: 'ri-book-open-line',
      color: 'blue'
    },
    {
      term: 'Épargne',
      definition: 'Argent que vous gardez de côté au lieu de le dépenser immédiatement.',
      icon: 'ri-coins-line',
      color: 'green'
    },
    {
      term: 'Investissement',
      definition: 'Placer de l\'argent dans quelque chose avec l\'espoir d\'obtenir un profit.',
      icon: 'ri-line-chart-line',
      color: 'purple'
    },
    {
      term: 'Intérêts',
      definition: 'L\'argent que vous gagnez quand vous prêtez ou épargnez votre argent.',
      icon: 'ri-percent-line',
      color: 'orange'
    },
    {
      term: 'Crédit',
      definition: 'Argent emprunté que vous devez rembourser, souvent avec des intérêts.',
      icon: 'ri-bank-card-line',
      color: 'red'
    },
    {
      term: 'Patrimoine',
      definition: 'La valeur totale de tout ce que vous possédez moins ce que vous devez.',
      icon: 'ri-safe-line',
      color: 'indigo'
    }
  ];

  const articles = {
    integrity: [
      {
        id: 1,
        title: 'L\'intégrité financière personnelle',
        description: 'Comment maintenir des pratiques financières honnêtes et transparentes dans sa vie quotidienne.',
        readTime: '8 min',
        featured: true,
        content: 'L\'intégrité financière commence par être honnête avec soi-même sur sa situation financière réelle...'
      },
      {
        id: 2,
        title: 'Être honnête avec soi-même sur ses finances',
        description: 'L\'importance de la sincérité dans l\'évaluation de sa situation financière.',
        readTime: '6 min',
        featured: false,
        content: 'La première étape vers une gestion financière saine est l\'honnêteté personnelle...'
      },
      {
        id: 3,
        title: 'Construire une réputation financière solide',
        description: 'Comment votre intégrité influence votre crédibilité financière.',
        readTime: '10 min',
        featured: false,
        content: 'Votre réputation financière est un actif précieux qui se construit au fil du temps...'
      }
    ],
    corruption: [
      {
        id: 4,
        title: 'Les dangers de la corruption au quotidien',
        description: 'Comment la corruption impacte négativement l\'économie familiale et nationale.',
        readTime: '12 min',
        featured: true,
        content: 'La corruption n\'est pas seulement un problème des dirigeants, elle affecte chaque famille...'
      },
      {
        id: 5,
        title: 'Refuser les pratiques malhonnêtes',
        description: 'Stratégies pour éviter et combattre la corruption dans les transactions.',
        readTime: '9 min',
        featured: false,
        content: 'Il existe des moyens concrets de résister à la corruption au quotidien...'
      },
      {
        id: 6,
        title: 'L\'impact économique de la corruption au Gabon',
        description: 'Comprendre comment la corruption freine le développement économique.',
        readTime: '15 min',
        featured: false,
        content: 'La corruption coûte cher à notre économie nationale et à chaque citoyen...'
      }
    ],
    ethics: [
      {
        id: 7,
        title: 'Les principes de l\'éthique financière',
        description: 'Fondements moraux pour une gestion financière responsable et équitable.',
        readTime: '11 min',
        featured: true,
        content: 'L\'éthique financière repose sur des principes universels de respect et d\'équité...'
      },
      {
        id: 8,
        title: 'Éthique dans les investissements',
        description: 'Comment choisir des placements qui respectent vos valeurs morales.',
        readTime: '13 min',
        featured: false,
        content: 'Investir de manière éthique signifie aligner vos placements avec vos valeurs...'
      },
      {
        id: 9,
        title: 'Responsabilité sociale et finances',
        description: 'L\'importance de considérer l\'impact social de nos décisions financières.',
        readTime: '8 min',
        featured: false,
        content: 'Chaque décision financière a un impact sur la société...'
      }
    ],
    family: [
      {
        id: 10,
        title: 'Budget familial : impliquer tous les membres',
        description: 'Stratégies pour créer un budget familial participatif et équitable.',
        readTime: '10 min',
        featured: true,
        content: 'Un budget familial réussi implique tous les membres de la famille...'
      },
      {
        id: 11,
        title: 'Enseigner l\'argent aux enfants',
        description: 'Méthodes pratiques pour éduquer financièrement vos enfants.',
        readTime: '12 min',
        featured: false,
        content: 'L\'éducation financière commence dès le plus jeune âge...'
      },
      {
        id: 12,
        title: 'Gérer les conflits financiers en famille',
        description: 'Comment résoudre les désaccords sur l\'argent dans le foyer.',
        readTime: '9 min',
        featured: false,
        content: 'Les conflits financiers sont normaux mais peuvent être résolus...'
      },
      {
        id: 13,
        title: 'Épargne familiale pour l\'éducation',
        description: 'Planifier et financer l\'éducation de vos enfants efficacement.',
        readTime: '11 min',
        featured: false,
        content: 'Investir dans l\'éducation de vos enfants est le meilleur placement...'
      }
    ]
  };

  const handleStartLesson = (lesson: any) => {
    if (lesson.completed) {
      setSelectedLesson(lesson);
      setShowLessonDetail(true);
    } else {
      setSelectedLesson(lesson);
      setShowLessonDetail(true);
    }
  };

  const handleCompleteLesson = () => {
    if (selectedLesson && !completedLessons.includes(selectedLesson.id)) {
      setCompletedLessons(prev => [...prev, selectedLesson.id]);
    }
    setShowQuiz(true);
    setShowLessonDetail(false);
    setCurrentQuizQuestion(0);
    setQuizAnswers({});
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    setShowQuizResult(true);
    setTimeout(() => {
      setShowQuizResult(false);
      setSelectedLesson(null);
    }, 3000);
  };

  const handleReadArticle = (article: any) => {
    setSelectedArticle(article);
    setShowArticleDetail(true);
  };

  const progress = {
    totalLessons: Object.values(lessons).flat().length,
    completedLessons: completedLessons.length
  };

  const progressPercentage = (progress.completedLessons / progress.totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white shadow-sm z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-arrow-left-line text-gray-600"></i>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Ma Petite Finance</h1>
          </div>
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <i className="ri-trophy-line text-indigo-600"></i>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-20 px-4">
        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-indigo-100 text-sm mb-1">Votre progression</p>
              <h3 className="text-2xl font-bold">{progress.completedLessons}/{progress.totalLessons} leçons</h3>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <i className="ri-graduation-cap-line text-white text-xl"></i>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-indigo-100 text-sm">{Math.round(progressPercentage)}% terminé</p>
        </div>

        {/* Achievement Badge */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                <i className="ri-medal-line text-yellow-600 text-xl"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {progress.completedLessons >= 5 ? 'Expert en Finance' : 
                   progress.completedLessons >= 3 ? 'Étudiant Avancé' : 'Débutant en Finance'}
                </h4>
                <p className="text-sm text-gray-500">{progress.completedLessons} leçons terminées</p>
              </div>
            </div>
            <div className="text-yellow-600">
              <i className="ri-star-fill text-xl"></i>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all !rounded-button ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <i className={category.icon}></i>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Lessons List */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-800">
            {categories.find(cat => cat.id === selectedCategory)?.name}
          </h3>
          
          {lessons[selectedCategory as keyof typeof lessons]?.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
                    {completedLessons.includes(lesson.id) && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white text-xs"></i>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <i className="ri-time-line"></i>
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="ri-signal-tower-line"></i>
                      <span>{lesson.difficulty}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleStartLesson(lesson)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all !rounded-button ${
                    completedLessons.includes(lesson.id)
                      ? 'bg-green-50 text-green-700'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {completedLessons.includes(lesson.id) ? 'Revoir' : 'Commencer'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Financial Terms Dictionary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Dictionnaire financier</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="space-y-3">
              {(showAllTerms ? financialTerms : financialTerms.slice(0, 2)).map((term, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 bg-${term.color}-50 rounded-full flex items-center justify-center mt-1`}>
                    <i className={`${term.icon} text-${term.color}-600 text-sm`}></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">{term.term}</h5>
                    <p className="text-sm text-gray-600">{term.definition}</p>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => setShowAllTerms(!showAllTerms)}
                className="w-full py-2 text-indigo-600 font-medium text-sm !rounded-button"
              >
                {showAllTerms ? 'Voir moins de termes ↑' : 'Voir plus de termes →'}
              </button>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Articles et guides</h3>
          
          {/* Article Category Tabs */}
          <div className="flex overflow-x-auto gap-2 mb-4 pb-2">
            {articleCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedArticleCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all !rounded-button ${
                  selectedArticleCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                <i className={category.icon}></i>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Articles List */}
          <div className="space-y-4">
            {articles[selectedArticleCategory as keyof typeof articles]?.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-800">{article.title}</h4>
                      {article.featured && (
                        <div className="px-2 py-1 bg-orange-100 rounded-full">
                          <span className="text-xs font-medium text-orange-600">À la une</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <i className="ri-time-line"></i>
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <i className="ri-article-line"></i>
                        <span>Article</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleReadArticle(article)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium transition-all !rounded-button"
                  >
                    Lire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Article Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="px-2 py-1 bg-white/20 rounded-full">
                  <span className="text-xs font-medium">Recommandé</span>
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2">Guide complet : Finances familiales éthiques</h4>
              <p className="text-green-100 text-sm mb-4">
                Un guide pratique pour gérer les finances de votre famille tout en maintenant des valeurs d'intégrité et d'éthique.
              </p>
              <div className="flex items-center gap-4 text-xs text-green-100">
                <span>• 25 min de lecture</span>
                <span>• Guide pratique</span>
                <span>• Exemples concrets</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => handleReadArticle({
              id: 999,
              title: 'Guide complet : Finances familiales éthiques',
              content: 'Ce guide complet vous accompagne dans la gestion éthique de vos finances familiales...',
              readTime: '25 min'
            })}
            className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium text-sm !rounded-button"
          >
            Commencer la lecture
          </button>
        </div>
      </div>

      {/* Lesson Detail Modal */}
      {showLessonDetail && selectedLesson && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">{selectedLesson.title}</h2>
              <button 
                onClick={() => setShowLessonDetail(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <i className="ri-time-line"></i>
                  <span>{selectedLesson.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="ri-signal-tower-line"></i>
                  <span>{selectedLesson.difficulty}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Introduction</h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedLesson.content?.introduction}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Points clés</h3>
                <ul className="space-y-2">
                  {selectedLesson.content?.keyPoints?.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleCompleteLesson}
                className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-xl !rounded-button"
              >
                {completedLessons.includes(selectedLesson.id) ? 'Refaire le quiz' : 'Terminer et passer au quiz'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && selectedLesson && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-question-line text-indigo-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Quiz de validation</h3>
              <p className="text-sm text-gray-500">Question {currentQuizQuestion + 1} sur {selectedLesson.content?.quiz?.length}</p>
            </div>

            {selectedLesson.content?.quiz?.[currentQuizQuestion] && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">
                  {selectedLesson.content.quiz[currentQuizQuestion].question}
                </h4>
                
                <div className="space-y-2">
                  {selectedLesson.content.quiz[currentQuizQuestion].options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(currentQuizQuestion, index)}
                      className={`w-full p-3 text-left rounded-lg border transition-all !rounded-button ${
                        quizAnswers[currentQuizQuestion] === index
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleQuizComplete}
                  disabled={quizAnswers[currentQuizQuestion] === undefined}
                  className={`w-full py-3 font-semibold rounded-xl !rounded-button transition-all ${
                    quizAnswers[currentQuizQuestion] !== undefined
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Valider la réponse
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quiz Result Modal */}
      {showQuizResult && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-green-600 text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Félicitations !</h3>
            <p className="text-gray-600 mb-4">Vous avez terminé cette leçon avec succès.</p>
            <div className="w-full bg-green-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {showArticleDetail && selectedArticle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">{selectedArticle.title}</h2>
              <button 
                onClick={() => setShowArticleDetail(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <i className="ri-time-line"></i>
                <span>{selectedArticle.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <i className="ri-article-line"></i>
                <span>Article</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {selectedArticle.content}
              </p>
              
              {selectedArticle.id === 999 && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Contenu du guide</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Établir des valeurs financières familiales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Créer un budget transparent et participatif</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Enseigner l'intégrité financière aux enfants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600">Prendre des décisions d'investissement éthiques</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-lightbulb-line text-green-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Conseil pratique</h4>
                  <p className="text-sm text-gray-600">Commencez par appliquer un principe à la fois dans votre gestion financière quotidienne.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
        <div className="grid grid-cols-5 gap-0">
          <Link href="/" className="flex flex-col items-center justify-center py-2 px-1">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-home-line text-gray-400 text-lg"></i>
            </div>
            <span className="text-xs text-gray-400">Accueil</span>
          </Link>
          
          <Link href="/expenses" className="flex flex-col items-center justify-center py-2 px-1">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-subtract-line text-gray-400 text-lg"></i>
            </div>
            <span className="text-xs text-gray-400">Dépenses</span>
          </Link>
          
          <Link href="/budget" className="flex flex-col items-center justify-center py-2 px-1">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-pie-chart-line text-gray-400 text-lg"></i>
            </div>
            <span className="text-xs text-gray-400">Budget</span>
          </Link>
          
          <Link href="/savings" className="flex flex-col items-center justify-center py-2 px-1">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-piggy-bank-line text-gray-400 text-lg"></i>
            </div>
            <span className="text-xs text-gray-400">Épargne</span>
          </Link>
          
          <Link href="/education" className="flex flex-col items-center justify-center py-2 px-1">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-book-line text-indigo-600 text-lg"></i>
            </div>
            <span className="text-xs text-indigo-600 font-medium">Formation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
