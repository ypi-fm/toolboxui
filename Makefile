# Variables
BINARY_NAME=toolboxui
BUILD_DIR=./bin
GO=go
GO_BUILD=$(GO) build
GO_TEST=$(GO) test
GO_CLEAN=$(GO) clean

.PHONY: build
build: build-web build-go ## Build all

.PHONY: build-go
build-go: ## Build Go part only
	@mkdir -p $(BUILD_DIR)
	$(GO_BUILD) -o $(BUILD_DIR)/$(BINARY_NAME) ./cmd/toolboxui

.PHONY: build-web
build-web: ## Build Web part only
	find web/dist -name "*.js.map" -type f -delete 2>/dev/null || true
	cd web && node esbuild.js --prod

.PHONY: format
format: format-go format-web ## Check and format all code

.PHONY: format-go
format-go: ## Check and format Go code
	gofumpt -w ./..
	goimports -w ./..

.PHONY: format-web
format-web: ## Check and format TypeScript/Web code
	cd web && npx ts-standard --fix
	cd web && npx tsc --noEmit --project tsconfig.json

.PHONY: clean
clean: ## Clean up binaries
	@$(GO_CLEAN)
	rm -rf bin 2>/dev/null || true
	rm -rf tmp 2>/dev/null || true
	find web/dist -name "*.js.map" -type f -delete 2>/dev/null || true

.PHONY: test
test: ## Test the application
	$(GO_TEST) ./...

.PHONY: dev
dev: ## Dev runner with live reloading
	@(cd web && node esbuild.js --watch & air -c .air.toml & trap 'kill 0' INT TERM EXIT; wait)

.PHONY: init
init: deps ## Initialize local environment for development (also installs dependencies)
	$(GO) install github.com/air-verse/air@v1.62.0
	pre-commit install
	pre-commit install --hook-type commit-msg

.PHONY: deps
deps: ## Install dependencies
	$(GO) install mvdan.cc/gofumpt@latest
	$(GO) install golang.org/x/tools/cmd/goimports@latest
	$(GO) mod tidy
	$(GO) mod download
	$(GO) mod verify
	cd web && npm install

.PHONY: help
help: ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-24s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

# Default target
.DEFAULT_GOAL := help
