#!/usr/bin/env bash

# Terminate already running bar instances
killall -q polybar

# Wait until the processes have been shut down
while pgrep -u $UID -x polybar >/dev/null; do sleep 1; done

# MONITOR=override-value polybar example

# Launch bar1 and bar2
# echo "---" | tee -a /tmp/polybar1.log /tmp/polybar2.log
polybar bar >>/tmp/example.log 2>&1 &
# polybar bar2 >>/tmp/polybar2.log 2>&1 &

echo "Bars launched..."
