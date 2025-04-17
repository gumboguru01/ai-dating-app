from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

users = [
    {"uid": "u1", "interests": "cooking, travel, AI"},
    {"uid": "u2", "interests": "travel, hiking, photography"},
    {"uid": "u3", "interests": "machine learning, AI, startups"},
    {"uid": "u4", "interests": "fashion, books, dance"}
]

# Vectorize interests
corpus = [user["interests"] for user in users]
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(corpus)

# Compute similarity matrix
similarity_matrix = cosine_similarity(X)

# Display similarity scores for user[0] (target)
target_index = 0
for i, score in enumerate(similarity_matrix[target_index]):
    if i != target_index:
        print(f"User {users[target_index]['uid']} vs User {users[i]['uid']}: Score = {score:.2f}")
