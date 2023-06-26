{
  'name': 'Thème Clé Carouge',
  'description': 'Thème pour Clé Carouge Sécurité SA',
  'summary': 'Thème pour Clé Carouge Sécurité SA',
  'author': 'anthillsolutions',
  'company': 'anthillsolutions',
  'website': 'https://www.anthillsolutions.net',
  'maintainer': 'anthillsolutions',
  'category': 'Theme/website',
  'depends': ['website_sale'],
  'auto_install': False,
  'installable': True,
  'version': '0.6',
  'data': [ 
    'views/contact_us.xml', 
    'views/footer.xml',
    'views/header.xml',
    'views/homepage.xml',
    'views/product.xml',
    'views/shop.xml',
    'views/snippets.xml',
    'views/templates.xml',
  ],
  'assets': {
    'web.assets_frontend': [
      'theme_clecarouge/static/scss/style.scss',
      'https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css',
      'theme_clecarouge/static/js/main.js',
      'https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js'
    ],
  'images': ['theme_clecarougee/static/description/banner.jpg'],
  },
  'license': 'LGPL-3',
}