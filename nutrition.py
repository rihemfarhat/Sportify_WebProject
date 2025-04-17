from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import time
import requests

# Lancer le navigateur
driver = webdriver.Chrome()

# Ouvre la page principale des articles de nutrition
url = "https://my.toneitup.com/pages/nutrition"
driver.get(url)

# Attendre le chargement complet
time.sleep(5)

# Récupérer le HTML
soup = BeautifulSoup(driver.page_source, 'html.parser')

# Fermer le navigateur
driver.quit()

# Exemple : trouver tous les liens vers les articles
article_links = []
for a in soup.find_all('a', href=True):
    if '/blogs/nutrition/' in a['href']:
        full_link = "https://my.toneitup.com" + a['href']
        if full_link not in article_links:
            article_links.append(full_link)

# Récupérer le contenu de chaque article
for link in article_links:
    res = requests.get(link)
    article_soup = BeautifulSoup(res.text, 'html.parser')
    
    title = article_soup.find('h1')
    content = article_soup.find('div', class_='article__content')  # Peut varier selon leur structure HTML
    
    print("Title:", title.get_text(strip=True) if title else "No title")
    print("Link:", link)
    print("Content snippet:", content.get_text(strip=True)[:300] if content else "No content")
    print("-" * 80)

