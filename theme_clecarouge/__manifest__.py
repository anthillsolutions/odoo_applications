{
  'name': 'Thème Clé Carouge',
  'description': 'Thème pour Clé Carouge Sécurité SA',
  'summary': 'Thème pour Clé Carouge Sécurité SA',
  'author': 'anthillsolutions',
  'company': 'anthillsolutions',
  'website': 'https://www.anthillsolutions.net',
  'maintainer': 'anthillsolutions',
  'category': 'Theme/website',
  'depends': ['website_sale', 'website_sale_wishlist'],
  'auto_install': False,
  'installable': True,
  'version': '0.1',
  'data': [ 
    'views/contact_us.xml', 
    'views/footer.xml',
    'views/header.xml',
    'views/homepage.xml',
    'views/menu_page.xml',
    'views/product.xml',
    'views/prestations.xml',
    'views/shop.xml',
    'views/snippets.xml',
    'views/templates.xml',
  ],
  'assets': {
    'web.assets_frontend': [
      'theme_clecarouge/static/scss/style.scss',
      'theme_clecarouge/static/js/main.js'
    ],
  'images': ['theme_clecarougee/static/description/banner.jpg'],
  },
  'license': 'LGPL-3',
}