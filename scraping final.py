from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from pymongo import MongoClient
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# 📌 Connexion à MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Connexion à MongoDB
db = client["authDB"]  # Base de données
collection = db["articles"]  # Collection des articles

# 📌 Configuration de Selenium (ChromeDriver)
options = webdriver.ChromeOptions()
options.headless = True  # Mode sans interface graphique
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# 📌 URL cible
url = "https://www.freeletics.com/fr/blog/reading-lists/"

# Ouvrir la page avec Selenium
driver.get(url)

# Attendre le chargement de la page
time.sleep(5)
WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "ReadingListPreview-module--readingListPreview--6840f"))
)

# 📌 Sélection de tous les articles
articles = driver.find_elements(By.CLASS_NAME, "ReadingListPreview-module--readingListPreview--6840f")

# 📌 Itérer sur tous les articles
for article in articles:
    try:
        # 📌 Récupérer le titre
        title = article.find_element(By.TAG_NAME, "h2").text.strip()
        
        # 📌 Récupérer la description dans la balise <p> avec itemprop="description"
        description_element = article.find_element(By.TAG_NAME, "p")
        description = description_element.text.strip() if description_element else "Aucune description"

        # 📌 Récupérer l'URL de l'article
        link_element = article.find_element(By.CLASS_NAME, "ReadingListPreview-module--readingListLink--f7f49")
        link = link_element.get_attribute("href")
        full_link = "https://www.freeletics.com" + link if link.startswith("/") else link  # Corriger lien relatif

        # 📌 Récupérer l'image
        img_tag = article.find_element(By.TAG_NAME, "img")
        img_url = img_tag.get_attribute("src")

        # 📌 Stocker les données dans MongoDB
        article_data = {
            "title": title,
            "description": description,
            "link": full_link,
            "image": img_url,
            "page_url": url
        }

        collection.insert_one(article_data)

        print(f"✅ Article ajouté: {title}")

    except Exception as e:
        print(f"❌ Erreur lors du scraping d'un article : {e}")

# Fermer le navigateur
driver.quit()

print("🎉 Scraping terminé ! Les articles ont été ajoutés à MongoDB.")
