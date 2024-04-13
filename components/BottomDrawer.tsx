import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ANIMATION_CONFIGS } from "@gorhom/bottom-sheet/src/constants";

import React, {
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useColorScheme } from "react-native";
import { ReduceMotion, useReducedMotion } from "react-native-reanimated";
type Ref = BottomSheetModal;
const BottomDrawer = forwardRef<Ref, PropsWithChildren>(({ children }, ref) => {
  const colorScheme = useColorScheme();
  const reducedMotion = useReducedMotion();
  const snapPoints = useMemo(() => ["80%"], []);
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      backgroundStyle={{
        backgroundColor: colorScheme === "dark" ? "#101010" : "#ffffff",
      }}
      ref={ref}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
    >
      <BottomSheetView className="px-4 gap-4">{children}</BottomSheetView>
    </BottomSheetModal>
  );
});

export default BottomDrawer;
