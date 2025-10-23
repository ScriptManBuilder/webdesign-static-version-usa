import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { usePrice } from '../hooks/usePrice';
import {
  DropdownWrapper,
  DropdownContent,
  CategoriesSection,
  CategoryTitle,
  CategoryList,
  CategoryItem,
  FeaturedSection,
  FeaturedTitle,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  ViewAllButton
} from '../styles/components/ProductsDropdownStyles';

interface ProductsDropdownProps {
  isVisible: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  selectedCategory?: string;
}

const ProductsDropdown: React.FC<ProductsDropdownProps> = ({ 
  isVisible, 
  onClose, 
  onMouseEnter, 
  onMouseLeave,
  selectedCategory = 'all'
}) => {
  const { formatPrice } = usePrice();
  
  // WordPress курсы категории для навигации (синхронизировано с Products.tsx)
  const categories = [
    { id: 'WordPress Basics', name: 'WordPress Basics', icon: '🔧', description: 'Start your WordPress journey' },
    { id: 'WordPress Content', name: 'Content Management', icon: '📝', description: 'Pages & navigation' },
    { id: 'WordPress Customization', name: 'Customization', icon: '🎨', description: 'Plugins & widgets' },
    { id: 'WordPress Themes', name: 'Themes', icon: '🎭', description: 'Theme management' },
    { id: 'WordPress Portfolio', name: 'Portfolio', icon: '💼', description: 'Professional portfolios' },
    { id: 'WordPress Video', name: 'Video Integration', icon: '📹', description: 'Video backgrounds' },
    { id: 'WordPress Blogging', name: 'Blogging', icon: '📰', description: 'Blog setup & management' },
    { id: 'WordPress Forms', name: 'Forms & Interaction', icon: '📋', description: 'Contact forms' },
    { id: 'WordPress Hosting', name: 'Hosting & Deployment', icon: '🌐', description: 'Flywheel hosting' },
    { id: 'WordPress Page Builders', name: 'Page Builders', icon: '🏗️', description: 'Advanced layouts' },
    { id: 'WordPress Client Work', name: 'Client Projects', icon: '👥', description: 'Real client workflow' }
  ];
  
  // Показываем только 3 товара для компактности
  const featuredProducts = products.slice(0, 3);

  const handleLinkClick = () => {
    onClose();
  };

  if (!isVisible) return null;

  return (
    <DropdownWrapper
      data-dropdown="products"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <DropdownContent>
        <CategoriesSection>
          <CategoryTitle>Course Categories</CategoryTitle>
          <CategoryList>
            {categories.map((category) => (
              <CategoryItem 
                key={category.id}
                $isActive={selectedCategory === category.id}
                as={Link} 
                to={`/products?category=${category.id}`}
                onClick={handleLinkClick}
              >
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <span style={{ marginRight: '10px', fontSize: '1.2em', flexShrink: 0 }}>
                    {category.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                      {category.name}
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#666', 
                      fontWeight: '400',
                      opacity: 0.8 
                    }}>
                      {category.description}
                    </div>
                  </div>
                </div>
              </CategoryItem>
            ))}
            <CategoryItem 
              $isActive={selectedCategory === 'all'}
              as={Link} 
              to="/products"
              onClick={handleLinkClick}
              style={{ 
                borderTop: '1px solid #e5e5e5', 
                marginTop: '8px', 
                paddingTop: '12px',
                fontWeight: '600'
              }}
            >
              <span style={{ marginRight: '8px', fontSize: '1.1em' }}>📚</span>
              All Courses
            </CategoryItem>
          </CategoryList>
        </CategoriesSection>

        <FeaturedSection>
          <FeaturedTitle>Featured WordPress Courses</FeaturedTitle>
          <ProductGrid>
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                as={Link} 
                to={`/product/${product.id}`}
                onClick={handleLinkClick}
              >
                {product.video ? (
                  <div style={{ position: 'relative', width: '100%', height: '120px' }}>
                    <video
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                      muted
                      playsInline
                      preload="metadata"
                      poster=""
                    >
                      <source src={product.video} type="video/mp4" />
                    </video>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '30px',
                      height: '30px',
                      background: 'rgba(0,0,0,0.7)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px'
                    }}>
                      ▶
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: 'rgba(102, 126, 234, 0.9)',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      VIDEO
                    </div>
                  </div>
                ) : (
                  <ProductImage src={product.image} alt={product.name} />
                )}
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  {/* <ProductPrice>{formatPrice(product.price)}</ProductPrice> */}
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductGrid>
          
          <ViewAllButton 
            as={Link} 
            to="/products"
            onClick={handleLinkClick}
          >
            View All Courses →
          </ViewAllButton>
        </FeaturedSection>
      </DropdownContent>
    </DropdownWrapper>
  );
};

export default ProductsDropdown;