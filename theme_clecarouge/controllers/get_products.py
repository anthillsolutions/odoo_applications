import json
import time

from odoo import http

class CarouselWebsiteSale(http.Controller):
    @http.route(['/website/suggestions'], type='http', auth="public", methods=['GET'], website='True')
    def get_suggest_json(self, **kw):
        results = []
        products = http.request.env['product.template'].search([('is_published', '=', True)], limit=5)
        for product in products:
            results.append({
                'name': product.name,
                'id': product.id,
                'isPublished': product.is_published,
                'img': product.website_meta_og_img,
                'price': product.list_price,
                'saleOk': product.sale_ok,
                'purchaseOk': product.purchase_ok
            })
        return json.dumps(results)

class MapGLToken(http.Controller):
    @http.route(['/website/mapgl'], type='http', auth='public', methods=['GET'], website='True')
    def get_mapgl_token(self):
        token = http.request.env['ir.config_parameter'].get_param('cc_mapgl_token')
        return json.dumps({ 'token': token })