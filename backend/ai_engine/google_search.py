from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from config.config import settings
from . import error_handling


def perform_search(query):
    """
    Perform a search using the Google Custom Search API.

    :param query: The search query string.
    :return: A list of search results, or None if an error occurs.
    """
    try:
        service = build("customsearch", "v1", developerKey=settings.GOOGLE_API_KEY)
        res = service.cse().list(q=query, cx=settings.SEARCH_ENGINE_ID).execute()
        return res['items']
    except HttpError as e:
        error_handling.handle_error(f"An HTTP error occurred while performing the search: {e}")
        return None
    except Exception as e:
        error_handling.handle_error(f"An unexpected error occurred while performing the search: {e}")
        return None


def is_search_query(user_text):
    search_keywords = ["find", "search", "look up", "where is", "what is"]
    
    for keyword in search_keywords:
        if keyword in user_text.lower():
            return keyword
    
    return None


def format_search_results_for_text(query, results):
    """
    Format search results for display to the user.

    :param results: A list of search results.
    :return: A formatted string containing the search results.
    """
    try:
        splitted_results = [result['title'] + " (" + result['link'] + ") "  for result in results]
        formatted_results = "\n\t• " + "\n\t• ".join(splitted_results) + "\n\n"
        response_text = f"Hmmm... I have just done google search. Here are the search results for <{query}>: \n{formatted_results} I hope you get an answer from these."

        return response_text
    except Exception as e:
        error_handling.handle_error(f"An error occurred while formatting the search results: {e}")
        return None


def format_search_results_for_speech(query, results):
    """
    Format search results for display to the user.

    :param results: A list of search results.
    :return: A formatted string containing the search results.
    """
    try:
        splitted_results = [result['title'] for result in results]
        formatted_results = " (and then) ".join(splitted_results)
        formatted_results = f"Hmmm... I have just done google search. Here are the search results for <{query}>: \n{formatted_results} I hope you get an answer from these."

        return formatted_results
    except Exception as e:
        error_handling.handle_error(f"An error occurred while formatting the search results: {e}")
        return None
