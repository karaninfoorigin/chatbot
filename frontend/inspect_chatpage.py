from pathlib import Path
p = Path('src/pages/Chat/ChatPage.tsx')
text = p.read_text(encoding='utf-8')
lines = text.splitlines()
for i in range(60, min(112, len(lines))):
    print(f'{i+1:3}: {lines[i]!r}')
