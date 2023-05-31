import json
import time

from odoo import http
from odoo.http import request

from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.addons.website.controllers.main import QueryURL


class CarouselWebsiteSale(http.Controller):
    @http.route(['/website/suggestions'], type='http', auth="public", methods=['GET'], website=True)
    # @http.route(['/website/suggestions'], type='', auth="public", website=True)
    def get_suggest_json(self, **kw):
        query = kw.get('query')
        names = query.split(' ')
        domain = ['|' for k in range(len(names) - 1)] + [('name', 'ilike', name) for name in names]
        products = request.env['product.template'].search(domain, limit=15)
        # products = sorted(products, key=lambda x: SequenceMatcher(None, query.lower(), x.name.lower()).ratio(),
                        #   reverse=True)
        results = []
        for product in products:
            results.append({'value': product.name, 'data': {'id': product.id, 'after_selected': product.name}})
        return json.dumps({
            'query': 'Unit',
            'suggestions': results
        })

class ProductCarouselWebsiteSale(WebsiteSale):
    @http.route(
        ["/website/render_product_carouselP"],
        type="http",
        auth="public",
        website=True,
        csrf=False,
        cache=30,
    )
    def render_product_carousel(
        self, domain=False, limit=12, products_per_slide=4, **kwargs
    ):
        return json.dumps({ 
            'a': 'top' 
        })
    
        # # Snippet options only allow a maximium of 24 records
        # limit = min(limit, 24)
        # _pricelist_context, pricelist = self._get_pricelist_context()
        # # Used this way to follow Odoo implementation
        # request.context = dict(
        #     request.context,
        #     pricelist=pricelist.id,
        #     partner=request.env.user.partner_id)
        # records = request.env["product.template"].search(domain or [], limit=limit)

        # records_grouped = []
        # record_list = []
        # for index, record in enumerate(records, 1):
        #     record_list.append(record)
        #     if index % products_per_slide == 0:
        #         records_grouped.append(record_list)
        #         record_list = []
        # if any(record_list):
        #     records_grouped.append(record_list)

        # template = "website_snippet_carousel_product.s_product_carousel_items"
        # return request.website.viewref(template).render(
        #     {
        #         # "objects": records_grouped,
        #         # "keep": QueryURL("/shop"),
        #         # "pager": request.website.pager(
        #         #     url="/shop", total=limit, scope=7, url_args=kwargs
        #         # ),
        #         # "products_per_slide": products_per_slide,
        #         # "num_slides": len(records_grouped),
        #         # "uniqueId": "pc-%d" % int(time.time() * 1000),
        #     }
        # )