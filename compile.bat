for %%f in (./lib/*.ts) do npx tsc "./lib/%%f" --lib es2018 --outDir ./dist
for %%f in (./lib/actions/*.ts) do npx tsc "./lib/actions/%%f" --lib es2018 --outDir ./dist/actions