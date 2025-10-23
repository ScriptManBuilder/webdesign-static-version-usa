import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '../styles/GlobalStyles';
import { products } from '../data/products';
import { usePrice } from '../hooks/usePrice';
import { RocketIcon, LightningIcon, ShieldIcon, GlobeIcon, TargetIcon, DiamondIcon } from '../components/FeatureIcons';
import LazyImage from '../components/LazyImage';
import {
  HeroSection,
  HeroVideo,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
  FeaturesSection,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  CarouselContainer,
  CarouselTrack,
  CarouselSlide,
  CarouselContent,
  CarouselTitle,
  CarouselSubtitle,
  CarouselDots,
  CarouselDot,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  ProductsSection,
  VideoSection,
  VideoSectionVideo,
  VideoSectionContent,
  VideoSectionTitle,
  VideoSectionSubtitle,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductContent,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  ProductButton,
  PremiumButton,
  ScrollReveal,
  ParallaxElement,
  PhotoGallerySection,
  PhotoStrip,
  PhotoItem,
  ScrollingTextBanner,
  ScrollingText,
  InfoSection,
  InfoGrid,
  InfoBlock,
  InfoTitle,
  InfoDescription,
  InfoSubsection,
  InfoSubtitle,
  InfoText,
  InfoHighlight
} from '../styles/pages/HomeStyles';

// Helper function for video paths
const getVideoPath = (filename: string): string => {
  // For production, try multiple sources
  if (process.env.NODE_ENV === 'production') {
    return `/videos/${filename}`;
  }
  // For development
  return `/videos/${filename}`;
};

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 6);
  const { formatPrice } = usePrice();
  const scrollRevealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoSectionVisible, setIsVideoSectionVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  // Состояние для карусели
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Состояние для второй карусели (Featured Solutions)
  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0);
  const totalFeaturedSlides = 3;

  // Состояние для автоматического выделения карточек продуктов
  const [activeProductCard, setActiveProductCard] = useState(0);
  const totalProductCards = featuredProducts.length;

  // Данные для слайдов карусели
  const carouselSlides = [
    {
      title: "Why Choose Design Ecourses?",
      subtitle: "Discover the excellence that makes our web design education exceptional"
    },
    {
      title: "Expert-Led Web Design Training",
      subtitle: "Learn from industry professionals with real-world web design experience"
    },
    {
      title: "Innovation Meets Education",
      subtitle: "Where cutting-edge web design knowledge meets practical application"
    }
  ];

  // Данные для слайдов Featured Solutions
  const featuredSlides = [
    {
      title: "Featured Web Design Courses",
      subtitle: "Discover our most popular and effective web design training programs"
    },
    {
      title: "Revolutionary Learning",
      subtitle: "Next-generation web design education that transforms careers"
    },
    {
      title: "Premium Web Design Education",
      subtitle: "Crafted for those who demand excellence in web design mastery"
    }
  ];

  // Мемоизируем массив изображений для галереи
  const galleryImages = useMemo(() => {
    // Новые изображения ribbon_1 - ribbon_8 для галереи
    const allImages = [
      { src: `/images/img_1.jpg`, alt: `Web Design Learning Ribbon 1`, type: 'design-ribbon' },
      { src: `/images/img_2.jpg`, alt: `Web Design Learning Ribbon 2`, type: 'design-ribbon' },
      { src: `/images/img_3.jpg`, alt: `Web Design Learning Ribbon 3`, type: 'design-ribbon' },
      { src: `/images/img_4.jpg`, alt: `Web Design Learning Ribbon 4`, type: 'design-ribbon' },
      { src: `/images/img_5.jpg`, alt: `Web Design Learning Ribbon 5`, type: 'design-ribbon' },
      { src: `/images/img_6.jpg`, alt: `Web Design Learning Ribbon 6`, type: 'design-ribbon' },
      { src: `/images/img_7.jpg`, alt: `Web Design Learning Ribbon 7`, type: 'design-ribbon' },
      { src: `/images/img_8.jpg`, alt: `Web Design Learning Ribbon 8`, type: 'design-ribbon' }
    ];
    
    // Перемешиваем для разнообразия и добавляем id1
    return allImages
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({
        id: index,
        src: img.src,
        alt: img.alt,
        type: img.type
      }));
  }, []);

  // Мемоизируем текст для бегущей строки
  const scrollingTexts = useMemo(() => [
    'MASTER WEB DESIGN TODAY',
    'FOLLOW US @DESIGN_ECOURSES',
    'PREMIUM WEB DESIGN EDUCATION COURSES',
    'TRANSFORM YOUR CAREER WITH DESIGN',
    'UI/UX DESIGN & FRONTEND DEVELOPMENT',
    'JOIN THE DESIGN REVOLUTION NOW'
  ], []);

  useEffect(() => {
    // Intersection Observer для scroll reveal эффектов
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Наблюдаем за всеми элементами с scroll reveal
    scrollRevealRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    // Intersection Observer для галереи
    const galleryObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          galleryObserver.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    // Intersection Observer для новой видео секции
    const videoSectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoSectionVisible(true);
          videoSectionObserver.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (galleryRef.current) {
      galleryObserver.observe(galleryRef.current);
    }

    if (videoSectionRef.current) {
      videoSectionObserver.observe(videoSectionRef.current);
    }

    // Parallax эффект при скролле (throttled)
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          parallaxRefs.current.forEach((ref, index) => {
            if (ref) {
              const speed = (index + 1) * 0.1;
              const yPos = -(scrollY * speed);
              ref.style.transform = `translateY(${yPos}px)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      galleryObserver.disconnect();
      videoSectionObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Автоматическое переключение слайдов каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Автоматическое переключение слайдов Featured Solutions каждые 5 секунд (со сдвигом)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedSlide(prev => (prev + 1) % totalFeaturedSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalFeaturedSlides]);

  // Автоматическое выделение карточек продуктов каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProductCard(prev => (prev + 1) % totalProductCards);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalProductCards]);

  // Функция для переключения на определенный слайд
  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Функция для переключения на определенный слайд Featured Solutions
  const goToFeaturedSlide = (slideIndex: number) => {
    setCurrentFeaturedSlide(slideIndex);
  };

  // Поддержка свайпов для мобильных устройств
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Свайп влево - следующий слайд
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    } else if (isRightSwipe) {
      // Свайп вправо - предыдущий слайд
      setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  // Поддержка свайпов для Featured Solutions карусели
  const [featuredTouchStart, setFeaturedTouchStart] = useState<number | null>(null);
  const [featuredTouchEnd, setFeaturedTouchEnd] = useState<number | null>(null);

  const onFeaturedTouchStart = (e: React.TouchEvent) => {
    setFeaturedTouchEnd(null);
    setFeaturedTouchStart(e.targetTouches[0].clientX);
  };

  const onFeaturedTouchMove = (e: React.TouchEvent) => {
    setFeaturedTouchEnd(e.targetTouches[0].clientX);
  };

  const onFeaturedTouchEnd = () => {
    if (!featuredTouchStart || !featuredTouchEnd) return;
    
    const distance = featuredTouchStart - featuredTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Свайп влево - следующий слайд
      setCurrentFeaturedSlide(prev => (prev + 1) % totalFeaturedSlides);
    } else if (isRightSwipe) {
      // Свайп вправо - предыдущий слайд
      setCurrentFeaturedSlide(prev => (prev - 1 + totalFeaturedSlides) % totalFeaturedSlides);
    }
  };

  const setScrollRevealRef = (index: number) => (el: HTMLDivElement | null) => {
    scrollRevealRefs.current[index] = el;
  };

  const setParallaxRef = (index: number) => (el: HTMLDivElement | null) => {
    parallaxRefs.current[index] = el;
  };

  return (
    <>
      <HeroSection>
        <HeroVideo 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
        >
          <source src={getVideoPath('videoAI_3_1.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </HeroVideo>
        <Container>
          <HeroContent>
            <HeroTitle>DESIGN ECOURSES</HeroTitle>
            <HeroSubtitle>
              Master Web Design with Expert-Led Video Courses - Transform Your Career Today
            </HeroSubtitle>
            <HeroButtons>
              <Button as={Link} to="/products" variant="primary">
                Browse Courses
              </Button>
              <Button as={Link} to="/about" variant="outline">
                Our Mission
              </Button>
            </HeroButtons>
          </HeroContent>
        </Container>
      </HeroSection>

      <FeaturesSection>
        
        <Container>
          <ScrollReveal ref={setScrollRevealRef(0)}>
            {/* Карусель плашек */}
            <CarouselContainer
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <CarouselTrack currentSlide={currentSlide}>
                {carouselSlides.map((slide, index) => (
                  <CarouselSlide key={index}>
                    <CarouselContent>
                      <CarouselTitle>{slide.title}</CarouselTitle>
                      <CarouselSubtitle>{slide.subtitle}</CarouselSubtitle>
                    </CarouselContent>
                  </CarouselSlide>
                ))}
              </CarouselTrack>
            </CarouselContainer>
            
            {/* Навигационные точки */}
            <CarouselDots>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <CarouselDot
                  key={index}
                  active={currentSlide === index}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </CarouselDots>
          </ScrollReveal>
          
          <FeaturesGrid>
            <ScrollReveal ref={setScrollRevealRef(1)} delay={100}>
              <FeatureCard>
                <RocketIcon />
                <FeatureTitle>Expert Web Design Instruction</FeatureTitle>
                <FeatureDescription>
                  Learn from industry professionals with hands-on web design experience and proven track records.
                </FeatureDescription>
              </FeatureCard>
            </ScrollReveal>
            
            <ScrollReveal ref={setScrollRevealRef(2)} delay={200}>
              <FeatureCard>
                <LightningIcon />
                <FeatureTitle>Instant Access Learning</FeatureTitle>
                <FeatureDescription>
                  Start learning immediately with lifetime access to all course materials and updates.
                </FeatureDescription>
              </FeatureCard>
            </ScrollReveal>
            
            <ScrollReveal ref={setScrollRevealRef(3)} delay={300}>
              <FeatureCard>
                <ShieldIcon />
                <FeatureTitle>Certified Quality</FeatureTitle>
                <FeatureDescription>
                  Industry-recognized certificates and rigorous curriculum ensure professional standards.
                </FeatureDescription>
              </FeatureCard>
            </ScrollReveal>
            
            <ScrollReveal ref={setScrollRevealRef(4)} delay={400}>
              <FeatureCard>
                <GlobeIcon />
                <FeatureTitle>Global Community</FeatureTitle>
                <FeatureDescription>
                  Join hundreds of web design enthusiasts worldwide with 24/7 support and community access.
                </FeatureDescription>
              </FeatureCard>
            </ScrollReveal>
            
            <ScrollReveal ref={setScrollRevealRef(5)} delay={500}>
              <FeatureCard>
                <TargetIcon />
                <FeatureTitle>Practical Application</FeatureTitle>
                <FeatureDescription>
                  Real-world projects and case studies that you can apply immediately in your work.
                </FeatureDescription>
              </FeatureCard>
            </ScrollReveal>
            
            <ScrollReveal ref={setScrollRevealRef(6)} delay={600}>
              <FeatureCard>
                <DiamondIcon />
                <FeatureTitle>Premium Content</FeatureTitle>
                <FeatureDescription>
                  Cutting-edge curriculum updated regularly with the latest web design developments and trends.
                </FeatureDescription>
              </FeatureCard>
            </ScrollReveal>
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      {/* Новая независимая видео секция */}
      <VideoSection ref={videoSectionRef}>
        {isVideoSectionVisible && (
          <VideoSectionVideo 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="none"
          >
                        <source src={getVideoPath('videoAI_2.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </VideoSectionVideo>
        )}
        <VideoSectionContent>
          <VideoSectionTitle>Web Design Learning in Motion</VideoSectionTitle>
          <VideoSectionSubtitle>
            Experience the future of web design education through interactive learning and real-world applications
          </VideoSectionSubtitle>
        </VideoSectionContent>
      </VideoSection>

      <ProductsSection>
        <Container>
          <ScrollReveal ref={setScrollRevealRef(7)}>
            {/* Карусель Featured Solutions */}
            <CarouselContainer
              onTouchStart={onFeaturedTouchStart}
              onTouchMove={onFeaturedTouchMove}
              onTouchEnd={onFeaturedTouchEnd}
            >
              <CarouselTrack currentSlide={currentFeaturedSlide}>
                {featuredSlides.map((slide, index) => (
                  <CarouselSlide key={index}>
                    <CarouselContent>
                      <CarouselTitle>{slide.title}</CarouselTitle>
                      <CarouselSubtitle>{slide.subtitle}</CarouselSubtitle>
                    </CarouselContent>
                  </CarouselSlide>
                ))}
              </CarouselTrack>
            </CarouselContainer>
            
            {/* Навигационные точки для Featured Solutions */}
            <CarouselDots>
              {Array.from({ length: totalFeaturedSlides }).map((_, index) => (
                <CarouselDot
                  key={index}
                  active={currentFeaturedSlide === index}
                  onClick={() => goToFeaturedSlide(index)}
                />
              ))}
            </CarouselDots>
          </ScrollReveal>
          
          <ProductsGrid>
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} ref={setScrollRevealRef(8 + index)} delay={index * 100}>
                <ProductCard $isActive={activeProductCard === index}>
                  {product.video ? (
                    <video
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '12px 12px 0 0'
                      }}
                      preload="metadata"
                      muted
                      playsInline
                      controls
                      controlsList="nodownload"
                    >
                      <source src={product.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <ProductImage src={product.image} alt={product.name} />
                  )}
                  <ProductInfo>
                    <ProductContent>
                      <div>
                        <ProductTitle>{product.name}</ProductTitle>
                        <ProductPrice>{formatPrice(product.price)}</ProductPrice>
                        <ProductDescription>{product.description}</ProductDescription>
                      </div>
                      <ProductButton as={Link} to={`/product/${product.id}`}>
                        Start Learning
                      </ProductButton>
                    </ProductContent>
                  </ProductInfo>
                </ProductCard>
              </ScrollReveal>
            ))}
          </ProductsGrid>
          
          <ScrollReveal ref={setScrollRevealRef(14)}>
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
              <PremiumButton as={Link} to="/products">
                <span>
                  🎓 View All Courses
                </span>
              </PremiumButton>
            </div>
          </ScrollReveal>
        </Container>
      </ProductsSection>

      {/* Photo Gallery Section */}
      <PhotoGallerySection ref={galleryRef}>
        {isVisible && (
          <PhotoStrip>
            {/* Первый набор изображений */}
            {galleryImages.map((image) => (
              <PhotoItem key={`first-${image.id}`} className={`photo-${image.type}`}>
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                />
              </PhotoItem>
            ))}
            {/* Дублированный набор для бесконечной прокрутки */}
            {galleryImages.map((image) => (
              <PhotoItem key={`second-${image.id}`} className={`photo-${image.type}`}>
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                />
              </PhotoItem>
            ))}
            {/* Третий набор для полной бесконечности */}
            {galleryImages.map((image) => (
              <PhotoItem key={`third-${image.id}`} className={`photo-${image.type}`}>
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                />
              </PhotoItem>
            ))}
          </PhotoStrip>
        )}
        
        <ScrollingTextBanner>
          <ScrollingText>
            {scrollingTexts.map((text, index) => (
              <span key={index}>{text}</span>
            ))}
          </ScrollingText>
        </ScrollingTextBanner>
      </PhotoGallerySection>

      {/* Information Section */}
      <InfoSection>
        <InfoGrid>
          <InfoBlock>
            <InfoTitle>Master Web Design</InfoTitle>
            <InfoDescription>
              Transform your career with comprehensive web design training. 
              Learn visual design, user experience, frontend development, and advanced design applications 
              that professionals use to build powerful solutions.
            </InfoDescription>
            
            <InfoSubsection>
              <InfoSubtitle>Professional Web Design Development</InfoSubtitle>
              <InfoText>
                Master <InfoHighlight>advanced design techniques </InfoHighlight> 
                 that deliver robust, scalable solutions. From basic syntax to 
                complex frameworks, learn to build professional applications.
              </InfoText>
            </InfoSubsection>
          </InfoBlock>

          <InfoBlock>
            <InfoTitle>Real-World Applications</InfoTitle>
            <InfoDescription>
              Apply design knowledge immediately with practical projects and case studies. 
              Our courses focus on real business scenarios and measurable productivity gains.
            </InfoDescription>
            
            <InfoSubsection>
              <InfoSubtitle>Industry-Proven Methods</InfoSubtitle>
              <InfoText>
                Learn <InfoHighlight>battle-tested design strategies</InfoHighlight> used by 
                Fortune 500 companies. From web development to data analysis, 
                master techniques that deliver immediate ROI.
              </InfoText>
            </InfoSubsection>
          </InfoBlock>

          <InfoBlock>
            <InfoTitle>Lifetime Learning Access</InfoTitle>
            <InfoDescription>
              Enjoy unlimited access to all course materials, updates, and new content. 
              Stay ahead of the rapidly evolving design ecosystem with continuous learning.
            </InfoDescription>
            
            <InfoSubsection>
              <InfoSubtitle>Always Up-to-Date Content</InfoSubtitle>
              <InfoText>
                Access <InfoHighlight>regularly updated curriculum</InfoHighlight> that 
                evolves with design technology. New features, tools, and techniques are 
                added monthly to keep your skills current.
              </InfoText>
            </InfoSubsection>
          </InfoBlock>

          <InfoBlock>
            <InfoTitle>Expert Community Support</InfoTitle>
            <InfoDescription>
              Join a thriving community of design practitioners and receive personalized guidance. 
              Get answers to your questions and accelerate your learning journey.
            </InfoDescription>
            
            <InfoSubsection>
              <InfoSubtitle>24/7 Community Access</InfoSubtitle>
              <InfoText>
                Connect with <InfoHighlight>hundreds of design learners worldwide </InfoHighlight> 
                through our exclusive community platform. Share projects, get feedback, 
                and collaborate on design solutions.
              </InfoText>
            </InfoSubsection>
          </InfoBlock>
        </InfoGrid>
      </InfoSection>
    </>
  );
};

export default Home;
