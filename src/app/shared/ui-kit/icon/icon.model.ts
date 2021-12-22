export interface Icon {
  name: string,
  path: {
    outline: string,
    fill: string
  }
}

export class IconsLoader {
  private icons: Icon[] = [
    {
      name: 'home',
      path: {
        outline: 'assets/icons/Home.svg',
        fill: 'assets/icons/Home-fill.svg'
      }
    },
    {
      name: 'fire',
      path: {
        outline: 'assets/icons/Fire.svg',
        fill: 'assets/icons/Fire-fill.svg'
      }
    },
    {
      name: 'gear',
      path: {
        outline: 'assets/icons/Gear.svg',
        fill: 'assets/icons/Gear-fill.svg'
      }
    },
    {
      name: 'user',
      path: {
        outline: 'assets/icons/User.svg',
        fill: 'assets/icons/User-fill.svg'
      }
    },
    {
      name: 'video',
      path: {
        outline: 'assets/icons/Video.svg',
        fill: 'assets/icons/Video-fill.svg'
      }
    },
    {
      name: 'clapperboard',
      path: {
        outline: 'assets/icons/Clapperboard.svg',
        fill: 'assets/icons/Clapperboard-fill.svg'
      }
    },
    {
      name: 'search',
      path: {
        outline: 'assets/icons/Search.svg',
        fill: null,
      }
    },
    {
      name: 'bell',
      path: {
        outline: 'assets/icons/Bell.svg',
        fill: 'assets/icons/Bell-fill.svg',
      }
    },
    {
      name: 'bell-notify',
      path: {
        outline: 'assets/icons/Bell-notify.svg',
        fill: 'assets/icons/Bell-notify-fill.svg',
      }
    },
  ];

  constructor() {
  }

  getIcon(name: string): Icon {
    return this.icons.find((icon: Icon) => icon.name === name);
  }

}