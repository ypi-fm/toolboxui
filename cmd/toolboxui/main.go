package main

import (
	"fmt"

	"github.com/ypi-fm/toolboxui"
)

func main() {
	ui := &toolboxui.ToolboxUI{}
	if err := ui.Start(); err != nil {
		fmt.Println("Server error:", err)
	}
}
