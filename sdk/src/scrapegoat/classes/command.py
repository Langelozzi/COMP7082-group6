"""
"""

from abc import ABC, abstractmethod

from .conditions import InCondition


class Command(ABC):
    """
    """
    @abstractmethod
    def __init__(self, action: str):
        """
        """
        self.action = action

    @abstractmethod
    def execute(self, root) -> any:
        """
        """
        pass


class GrazeCommand(Command):
    """
    """
    def __init__(self, action: str, count: int, element: str, conditions: list=None, flags: list=None):
        """
        """
        super().__init__(action=action)
        self.count = count
        self.element = element
        self.conditions = conditions or []
        self.flags = flags or []

        for cond in self.conditions:
            if isinstance(cond, InCondition) and cond.target == "POSITION" and cond.query_tag is None:
                cond.query_tag = self.element
    
    def _evaluate(self, node, root) -> bool:
        """
        """
        if node.tag_type != self.element:
            return False
        return all(cond.evaluate(node, root) for cond in self.conditions)
    
    def execute(self, root) -> list:
        """
        """
        results = []
        for node in root.preorder_traversal():
            if self._evaluate(node, root):
                results.append(node)
                if self.count > 0 and len(results) >= self.count:
                    break
        return results
    

class ChurnCommand(Command):
    """
    """
    def __init__(self, fields: list = None, flags: list = None):
        """
        """
        super().__init__(action="extract")
        self.fields = fields or []
        self.flags = flags or []
    
    def execute(self, node) -> None:
        """
        """
        node.set_extract_instructions(self.fields, self.flags)
        

class DeliverCommand(Command):
    """
    """
    def __init__(self, file_type: str, flags: list = None):
        """
        """
        super().__init__(action="output")
        self.file_type = file_type
        self.flags = flags or []

    def execute(self, nodes: list) -> None:
        """
        """
        pass


def main():
    """
    """
    pass


if __name__ == "__main__":
    main()
