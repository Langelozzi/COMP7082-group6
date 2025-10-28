"""
"""

class Goat:
    """
    """
    def __init__(self):
        """
        """
        pass

    def feast(self, root, thistles) -> list:
        """
        """
        results = []
        i = 0
        while i < len(thistles):
            thistle = thistles[i]
            if thistle.action.lower() == "select":
                rebased_roots = thistle.execute(root)
                sub_thistles = thistles[i + 1:]
                for new_root in rebased_roots:
                    results.extend(self.feast(new_root, sub_thistles))
                return results
            if thistle.action.lower() == "extract":
                [thistle.execute(node) for node in results]
            else:
                results.extend(thistle.execute(root))
            i += 1
        return results
