"""
"""

from scrapegoat import Shepherd, Sheepdog, Loom


def main():
    """
    """
    sheepdog = Sheepdog()

    html = sheepdog.fetch("https://en.wikipedia.org/wiki/Web_scraping")
    
    shepherd = Shepherd()
    root = shepherd.sow(html)

    query = """
    SELECT table;
    SCRAPE a;
    EXTRACT @href;
    """
    results = shepherd.lead_goat(root, query)

    print([result.to_dict() for result in results])


if __name__ == "__main__":
    main()
