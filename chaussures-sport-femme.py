from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from pymongo import MongoClient
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import time

# 📌 Connexion à MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Connexion locale à MongoDB
db = client["authDB"]  # Base de données
collection = db["Products"]  # Collection des produits

# 📌 Configuration de Selenium
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # Mode sans interface graphique
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

# 📌 Lancer le navigateur
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# 📌 Liste des URLs des sites à scrapper
urls = [
    "https://www.tuttosport.com.tn/168-chaussures-sport-femme?page=1",
    "https://www.tuttosport.com.tn/168-chaussures-sport-femme?page=2",
    "https://www.tuttosport.com.tn/168-chaussures-sport-femme?page=3",
    "https://www.tuttosport.com.tn/168-chaussures-sport-femme?page=4",
    "https://www.tuttosport.com.tn/168-chaussures-sport-femme?page=5",
    "https://www.tuttosport.com.tn/168-chaussures-sport-femme?page=6",
    "https://www.tuttosport.com.tn/168-chaussures-sport-femme?page=7",
    "https://www.tuttosport.com.tn/168-chaussures-sport-femme?page=8"
]

# 📌 Fonction pour scraper un site
def scrape_site(url):
    driver.get(url)

    # 📌 Attendre le chargement des produits
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "product-miniature"))
        )
    except TimeoutException:
        print(f"❌ Temps d'attente dépassé pour {url}. Impossible de charger la page.")
        return

    # 📌 Sélectionner tous les produits
    products = driver.find_elements(By.CLASS_NAME, "product-miniature")

    # 📌 Itérer sur tous les produits et récupérer les informations
    for product in products:
        try:
            # 📌 Récupérer le titre du produit
            title_element = product.find_element(By.CLASS_NAME, "product-title")
            title = title_element.text.strip() if title_element else "Titre indisponible"

            # 📌 Récupérer le prix du produit
            price_element = product.find_element(By.CLASS_NAME, "price")
            price = price_element.text.strip() if price_element else "Prix indisponible"

            # 📌 Récupérer l'URL du produit
            link_element = product.find_element(By.TAG_NAME, "a")
            product_link = link_element.get_attribute("href") if link_element else "Lien indisponible"

            # 📌 Récupérer l'image du produit
            img_element = product.find_element(By.TAG_NAME, "img")
            img_url = img_element.get_attribute("src") if img_element else "Image indisponible"

            # 📌 Stocker les données dans MongoDB
            product_data = {
                "title": title,
                "price": price,
                "link": product_link,
                "image": img_url,
                "source": url  # Ajouter l'URL source pour identifier le site
            }

            # Vérifier si le produit est déjà dans la base de données
            if collection.find_one({"link": product_link}):
                print(f"✅ Produit déjà présent : {title}")
            else:
                collection.insert_one(product_data)
                print(f"✅ Produit ajouté : {title}")

        except (NoSuchElementException, TimeoutException) as e:
            print(f"❌ Erreur sur un produit : {e}")

# 📌 Scraper chaque site
for site_url in urls:
    print(f"🔍 Scraping du site : {site_url}")
    scrape_site(site_url)

# Fermer le navigateur
driver.quit()

print("🎉 Scraping terminé ! Les produits sont enregistrés dans MongoDB.")
