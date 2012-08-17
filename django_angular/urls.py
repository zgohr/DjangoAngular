from django.conf.urls import patterns, url


urlpatterns = patterns('',
    url(r'^$', 'django.views.generic.simple.direct_to_template',
        {'template': 'home.html'}),
)
